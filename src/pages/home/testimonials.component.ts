import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { SALON_DATA } from '../../data/salon-data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="bg-deepBlack text-ivory py-32 px-6 relative overflow-hidden">
      <!-- Decorative Quote -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[20rem] text-white/[0.02] italic pointer-events-none select-none">
        "
      </div>

      <div class="container mx-auto max-w-2xl relative z-10 text-center">
        <div appReveal class="min-h-[250px] flex flex-col justify-center">
          <p class="font-serif text-2xl md:text-3xl italic leading-relaxed mb-8">
            {{ currentReview().text }}
          </p>
          <div>
            <p class="text-xs uppercase tracking-widest text-bronze mb-2">{{ currentReview().author }}</p>
            <p class="text-white/40 text-xs">{{ currentReview().service }}</p>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center gap-4 mt-8">
          @for (review of reviews; track $index) {
            <button 
              (click)="setIndex($index)"
              class="w-2 h-2 rounded-full transition-all duration-300"
              [class.bg-bronze]="currentIndex() === $index"
              [class.bg-white/20]="currentIndex() === $index">
            </button>
          }
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  currentIndex = signal(0);
  reviews = SALON_DATA.reviews;

  currentReview = computed(() => this.reviews[this.currentIndex()]);

  setIndex(index: number) {
    this.currentIndex.set(index);
  }
}