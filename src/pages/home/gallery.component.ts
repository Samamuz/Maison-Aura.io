import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RevealDirective, NgOptimizedImage],
  template: `
    <section id="gallery" class="bg-ivory py-32 overflow-hidden">
      <div class="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div appReveal>
          <span class="text-bronze text-xs uppercase tracking-widest mb-4 block">Inspirations</span>
          <h2 class="font-serif text-4xl italic text-deepBlack">L'Atelier</h2>
        </div>
        <div class="hidden md:block text-xs uppercase tracking-widest text-charcoal/40">
           Glisser pour explorer →
        </div>
      </div>

      <!-- Horizontal Scroll Container -->
      <div class="flex overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12 gap-6 px-6 md:px-12">
        @for (img of images; track $index) {
          <div class="snap-center shrink-0 w-[80vw] md:w-[400px] aspect-[3/4] relative overflow-hidden group">
            <img 
              [ngSrc]="img.url" 
              width="400" 
              height="533" 
              [alt]="img.alt"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        }
      </div>
    </section>
  `
})
export class GalleryComponent {
  images = [
    { url: 'https://images.unsplash.com/photo-1560066984-12186d30b435?q=80&w=1000&auto=format&fit=crop', alt: 'Haircut in progress' },
    { url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1000&auto=format&fit=crop', alt: 'Interior Detail' },
    { url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop', alt: 'Stylist working' },
    { url: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1000&auto=format&fit=crop', alt: 'Salon Atmosphere' },
    { url: 'https://images.unsplash.com/photo-1522337360705-8754d1a2e284?q=80&w=1000&auto=format&fit=crop', alt: 'Product Detail' },
  ];
}