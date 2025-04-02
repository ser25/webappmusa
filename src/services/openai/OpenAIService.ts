import OpenAI from 'openai';

export class OpenAIService {
  private openai: OpenAI;
  private assistantId: string;
  private activeRuns: Map<string, string>;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const assistantId = process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID;

    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_OPENAI_API_KEY is not configured');
    }

    if (!assistantId) {
      throw new Error('NEXT_PUBLIC_OPENAI_ASSISTANT_ID is not configured');
    }

    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    this.assistantId = assistantId;
    this.activeRuns = new Map();
  }

  async sendMessage(threadId: string, content: string): Promise<void> {
    try {
      // Проверяем, есть ли активный run для этого треда
      const activeRunId = this.activeRuns.get(threadId);
      if (activeRunId) {
        // Если есть активный run, ждем его завершения
        await this.waitForRun(threadId, activeRunId);
      }

      // Создаем сообщение
      await this.openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content: content
      });

      // Создаем новый run
      const run = await this.openai.beta.threads.runs.create(threadId, {
        assistant_id: this.assistantId
      });

      // Сохраняем активный run
      this.activeRuns.set(threadId, run.id);

      // Ждем завершения run
      await this.waitForRun(threadId, run.id);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  private async waitForRun(threadId: string, runId: string): Promise<void> {
    while (true) {
      const run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
      
      if (run.status === 'completed') {
        this.activeRuns.delete(threadId);
        break;
      } else if (run.status === 'failed' || run.status === 'cancelled' || run.status === 'expired') {
        this.activeRuns.delete(threadId);
        throw new Error(`Run failed with status: ${run.status}`);
      }

      // Ждем 1 секунду перед следующей проверкой
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  async getMessages(threadId: string): Promise<Array<{ role: string; content: string }>> {
    try {
      const messages = await this.openai.beta.threads.messages.list(threadId);
      return messages.data.map(message => {
        const content = message.content[0];
        if ('text' in content) {
          return {
            role: message.role,
            content: content.text.value
          };
        }
        return {
          role: message.role,
          content: 'Unsupported message type'
        };
      });
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  }

  async createThread(): Promise<string> {
    try {
      const thread = await this.openai.beta.threads.create();
      return thread.id;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }
} 