import OpenAI from 'openai';

class OpenAIService {
  private openai: OpenAI;
  private assistantId: string;

  constructor() {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    this.openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Разрешаем использование в браузере
    });
    
    this.assistantId = process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID || '';
    
    if (!this.assistantId) {
      throw new Error('OpenAI Assistant ID is not configured');
    }
  }

  async createThread() {
    try {
      const thread = await this.openai.beta.threads.create();
      return thread.id;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }

  async sendMessage(threadId: string, content: string) {
    try {
      await this.openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content: content,
      });

      const run = await this.openai.beta.threads.runs.create(threadId, {
        assistant_id: this.assistantId,
      });

      return this.waitForResponse(threadId, run.id);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  private async waitForResponse(threadId: string, runId: string) {
    try {
      let run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
      
      // Ждем завершения выполнения
      while (run.status === 'in_progress' || run.status === 'queued') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
      }

      if (run.status === 'completed') {
        const messages = await this.openai.beta.threads.messages.list(threadId);
        const lastMessage = messages.data[0];
        
        // Извлекаем текстовое содержимое из сообщения
        const textContent = lastMessage.content.find(
          content => content.type === 'text'
        );

        if (!textContent || textContent.type !== 'text') {
          throw new Error('No text content in response');
        }

        return textContent.text.value;
      } else {
        throw new Error(`Run ended with status: ${run.status}`);
      }
    } catch (error) {
      console.error('Error waiting for response:', error);
      throw error;
    }
  }
}

export const openAIService = new OpenAIService(); 