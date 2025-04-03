import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

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

  async sendMessage(messages: ChatCompletionMessageParam[], onStream?: (content: string) => void): Promise<string> {
    try {
      if (onStream) {
        // Використовуємо стрімінг
        const stream = await this.openai.chat.completions.create({
          model: 'gpt-4o',
          messages,
          stream: true,
        });

        let fullContent = '';
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            fullContent += content;
            onStream(fullContent);
          }
        }
        return fullContent;
      } else {
        // Без стрімінгу
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-4o',
          messages,
        });

        return completion.choices[0]?.message?.content || '';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  private async streamRun(threadId: string, runId: string, onStream: (content: string) => void): Promise<void> {
    let lastMessageId: string | null = null;
    
    while (true) {
      try {
        const run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
        
        if (run.status === 'completed') {
          // Отримуємо фінальне повідомлення
          const messages = await this.openai.beta.threads.messages.list(threadId);
          const lastMessage = messages.data[0];
          if (lastMessage && lastMessage.role === 'assistant') {
            const textContent = lastMessage.content.find(content => 'text' in content);
            if (textContent && 'text' in textContent) {
              onStream(textContent.text.value);
            }
          }
          this.activeRuns.delete(threadId);
          break;
        } else if (run.status === 'failed' || run.status === 'cancelled' || run.status === 'expired') {
          this.activeRuns.delete(threadId);
          throw new Error(`Run failed with status: ${run.status}`);
        } else if (run.status === 'in_progress') {
          // Отримуємо останні повідомлення
          const messages = await this.openai.beta.threads.messages.list(threadId);
          const lastMessage = messages.data[0];
          
          // Перевіряємо, чи це нове повідомлення
          if (lastMessage && lastMessage.role === 'assistant' && lastMessage.id !== lastMessageId) {
            lastMessageId = lastMessage.id;
            
            // Перевіряємо наявність текстового контенту
            const textContent = lastMessage.content.find(content => 'text' in content);
            if (textContent && 'text' in textContent) {
              onStream(textContent.text.value);
            }
          }
        }

        // Чекаємо перед наступною перевіркою
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error in streamRun:', error);
        throw error;
      }
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

      // Чекаємо перед наступною перевіркою
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  async getMessages(threadId: string): Promise<Array<{ role: string; content: string }>> {
    try {
      const messages = await this.openai.beta.threads.messages.list(threadId);
      return messages.data.map(message => {
        const textContent = message.content.find(content => 'text' in content);
        if (textContent && 'text' in textContent) {
          return {
            role: message.role,
            content: textContent.text.value
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