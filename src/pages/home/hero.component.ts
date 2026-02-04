import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/ui/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  template: `
    <section class="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2574&auto=format&fit=crop" 
          alt="Salon Interior" 
          class="w-full h-full object-cover animate-[scale_20s_ease-out_infinite] scale-100 opacity-90"
        />
        <div class="absolute inset-0 bg-black/20"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p class="text-ivory/90 text-sm uppercase tracking-[0.2em] mb-6 animate-fade-in-up">
          Paris — 1er Arrondissement
        </p>
        
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory mb-8 italic leading-tight">
          <span class="block animate-fade-in-up" style="animation-delay: 0.1s">L'Art de la</span>
          <span class="block animate-fade-in-up" style="animation-delay: 0.2s">Coiffure Sublime</span>
        </h1>

        <div class="animate-fade-in-up" style="animation-delay: 0.4s">
          <app-button variant="dark" (onClick)="scrollToIntro()">Découvrir l'univers</app-button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span class="text-[10px] uppercase text-ivory tracking-widest">Scroll</span>
        <div class="w-[1px] h-12 bg-ivory"></div>
      </div>
    </section>
  `
})
export class HeroComponent {
  scrollToIntro() {
    const el = document.getElementById('intro');
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}