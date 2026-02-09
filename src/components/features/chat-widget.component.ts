import { Component, ElementRef, ViewChild, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../services/ai.service';
import { Chat } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-6 right-6 z-[999] flex flex-col items-end font-sans">
      
      <!-- Chat Window -->
      @if (isOpen()) {
        <div 
          class="mb-4 w-[90vw] md:w-96 h-[500px] bg-ivory shadow-2xl rounded-xl overflow-hidden border border-bronze/20 flex flex-col animate-fade-in-up origin-bottom-right transition-all">
          
          <!-- Header -->
          <div class="bg-deepBlack p-4 flex justify-between items-center text-ivory">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <div>
                <h3 class="font-serif italic text-lg">Assistant Aura</h3>
                <p class="text-[10px] uppercase tracking-widest opacity-60">Toujours à votre écoute</p>
              </div>
            </div>
            <button (click)="toggleChat()" class="opacity-50 hover:opacity-100 transition-opacity text-xl">×</button>
          </div>

          <!-- Messages Area -->
          <div #scrollContainer class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfbf9]">
            @for (msg of messages(); track $index) {
              <div [class]="'flex ' + (msg.role === 'user' ? 'justify-end' : 'justify-start')">
                <div 
                  [class]="'max-w-[80%] p-3 text-sm rounded-lg ' + 
                  (msg.role === 'user' 
                    ? 'bg-deepBlack text-ivory rounded-br-none' 
                    : 'bg-white border border-black/5 text-charcoal rounded-bl-none shadow-sm')">
                  {{ msg.text }}
                </div>
              </div>
            }
            @if (isThinking()) {
              <div class="flex justify-start">
                <div class="bg-white border border-black/5 p-3 rounded-lg rounded-bl-none shadow-sm flex gap-1">
                  <span class="w-1.5 h-1.5 bg-charcoal/40 rounded-full animate-bounce"></span>
                  <span class="w-1.5 h-1.5 bg-charcoal/40 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                  <span class="w-1.5 h-1.5 bg-charcoal/40 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                </div>
              </div>
            }
          </div>

          <!-- Input Area -->
          <div class="p-4 bg-white border-t border-black/5">
            <form (ngSubmit)="sendMessage()" class="relative">
              <input 
                type="text" 
                [(ngModel)]="currentMessage" 
                name="message"
                placeholder="Posez une question..." 
                class="w-full bg-ivory border border-black/10 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-bronze transition-colors text-deepBlack placeholder:text-black/30"
                [disabled]="isThinking()"
              />
              <button 
                type="submit"
                [disabled]="!currentMessage.trim() || isThinking()"
                class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-deepBlack text-ivory rounded-full flex items-center justify-center hover:bg-bronze transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                ↑
              </button>
            </form>
          </div>
        </div>
      }

      <!-- Toggle Button -->
      <button 
        (click)="toggleChat()"
        class="group w-14 h-14 rounded-full bg-deepBlack text-ivory shadow-lg flex items-center justify-center hover:scale-105 transition-all duration-300 hover:bg-bronze relative overflow-hidden">
        <div class="absolute inset-0 bg-bronze translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <span class="relative z-10 text-2xl font-serif italic">
          @if (!isOpen()) { A } @else { ↓ }
        </span>
      </button>

    </div>
  `
})
export class ChatWidgetComponent {
  private aiService = inject(AiService);
  
  isOpen = signal(false);
  isThinking = signal(false);
  messages = signal<Message[]>([
    { role: 'model', text: "Bonjour. Je suis Aura. Comment puis-je sublimer votre expérience aujourd'hui ?" }
  ]);
  currentMessage = '';
  
  chatSession: Chat | null = null;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor() {
    effect(() => {
      // Auto-scroll when messages change
      this.messages();
      setTimeout(() => this.scrollToBottom(), 50);
    });
  }

  toggleChat() {
    this.isOpen.update(v => !v);
    if (this.isOpen() && !this.chatSession) {
      if (!this.aiService.isAvailable) {
        console.warn('Chat IA indisponible : clé API non configurée.');
        return;
      }
      try {
        this.chatSession = this.aiService.createChat();
      } catch (e) {
        console.error("Impossible d'initialiser le chat IA", e);
      }
    }
  }

  async sendMessage() {
    if (!this.currentMessage.trim() || !this.chatSession) return;

    const userMsg = this.currentMessage;
    this.currentMessage = '';
    
    // Add user message
    this.messages.update(msgs => [...msgs, { role: 'user', text: userMsg }]);
    this.isThinking.set(true);

    try {
      const result = await this.chatSession.sendMessageStream({ message: userMsg });
      
      let fullResponse = '';
      // Create a placeholder for the model response
      this.messages.update(msgs => [...msgs, { role: 'model', text: '' }]);
      
      for await (const chunk of result) {
        // UX: Stop thinking animation as soon as we get the first chunk
        if (this.isThinking()) {
          this.isThinking.set(false);
        }

        const text = chunk.text;
        fullResponse += text;
        
        // Update the last message with the growing response
        this.messages.update(msgs => {
          const newMsgs = [...msgs];
          const lastIndex = newMsgs.length - 1;
          newMsgs[lastIndex] = { ...newMsgs[lastIndex], text: fullResponse };
          return newMsgs;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      this.messages.update(msgs => [...msgs, { role: 'model', text: "Je suis navrée, je rencontre une légère difficulté technique. Veuillez réessayer." }]);
    } finally {
      this.isThinking.set(false);
    }
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}