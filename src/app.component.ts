import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWidgetComponent } from './components/features/chat-widget.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatWidgetComponent, CommonModule],
  template: `
    <!-- Splash Screen / Loader -->
    <div 
      class="fixed inset-0 z-[9999] bg-ivory flex flex-col items-center justify-center transition-all duration-1000 ease-in-out"
      [class.opacity-0]="!isLoading()"
      [class.invisible]="!isLoading()"
      [class.pointer-events-none]="!isLoading()">
      
      <div class="overflow-hidden">
        <h1 class="font-serif text-5xl md:text-7xl italic text-deepBlack tracking-tighter opacity-0 animate-[fadeInUp_1.6s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          Maison Aura
        </h1>
      </div>
      
      <div class="mt-4 overflow-hidden">
        <p class="text-[10px] uppercase tracking-[0.4em] text-bronze opacity-0 animate-[fadeInUp_1.6s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards]">
          Paris • 1er Arrondissement
        </p>
      </div>
    </div>

    <router-outlet></router-outlet>
    <app-chat-widget />
    
    <!-- Custom Cursor Element (Visual only, simple implementation) -->
    <div id="cursor-dot" class="fixed top-0 left-0 w-2 h-2 bg-bronze rounded-full pointer-events-none z-[100] transition-transform duration-100 ease-out hidden md:block"></div>
    <div id="cursor-outline" class="fixed top-0 left-0 w-8 h-8 border border-bronze/50 rounded-full pointer-events-none z-[100] transition-transform duration-300 ease-out -translate-x-3 -translate-y-3 hidden md:block"></div>
  `
})
export class AppComponent {
  isLoading = signal(true);

  constructor() {
    // Logic for Splash Screen
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2500);

    // Simple custom cursor logic using vanilla JS for performance
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', (e) => {
        const dot = document.getElementById('cursor-dot');
        const outline = document.getElementById('cursor-outline');
        
        if (dot && outline) {
           dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
           outline.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
        }
      });
    }
  }
}