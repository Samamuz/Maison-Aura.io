import { Component, ElementRef, ViewChild, signal, AfterViewInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RevealDirective, NgOptimizedImage],
  template: `
    <section id="gallery" class="bg-ivory py-32 overflow-hidden select-none">
      <div class="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div appReveal>
          <span class="text-bronze text-xs uppercase tracking-widest mb-4 block">Inspirations</span>
          <h2 class="font-serif text-4xl italic text-deepBlack">L'Atelier</h2>
        </div>
        <div class="hidden md:block text-xs uppercase tracking-widest text-charcoal/40 animate-pulse">
           Glisser pour explorer →
        </div>
      </div>

      <!-- Horizontal Scroll Container -->
      <div 
        #scrollContainer
        (mousedown)="startDrag($event)"
        (mouseleave)="stopDrag()"
        (mouseup)="stopDrag()"
        (mousemove)="moveDrag($event)"
        (scroll)="checkScroll()"
        [class.cursor-grab]="!isDragging()"
        [class.cursor-grabbing]="isDragging()"
        [class.snap-x]="!isDragging()" 
        [class.snap-mandatory]="!isDragging()"
        class="flex overflow-x-auto no-scrollbar pb-12 gap-6 px-6 md:px-12 active:cursor-grabbing"
        style="scroll-behavior: auto;"> <!-- Force auto to prevent smooth scroll during infinite loop reset -->
        
        @for (img of images; track $index) {
          <div class="snap-center shrink-0 w-[80vw] md:w-[400px] aspect-[3/4] relative overflow-hidden group">
            <img 
              [ngSrc]="img.url" 
              width="400" 
              height="533" 
              [alt]="img.alt"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
            />
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        }
      </div>
    </section>
  `
})
export class GalleryComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;
  
  isDragging = signal(false);
  startX = 0;
  // Snapshot of scrollLeft when drag starts
  initialScrollLeft = 0;

  private sourceImages = [
    // Nouvelle image demandée pour la position 1
    { url: 'https://images.unsplash.com/photo-1595475716260-0f2c35f5a40f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Haircut in progress' },
    { url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1000&auto=format&fit=crop', alt: 'Interior Detail' },
    { url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop', alt: 'Stylist working' },
    { url: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1000&auto=format&fit=crop', alt: 'Salon Atmosphere' },
    // Ancienne image n°1 déplacée ici à la place de Product Detail
    { url: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1000&auto=format&fit=crop', alt: 'Haircut detail' },
  ];

  // Duplicate images to create the loop effect
  images = [...this.sourceImages, ...this.sourceImages];

  ngAfterViewInit() {
    // Optional: Start in the middle if we wanted bidirectional infinite scroll immediately,
    // but for now we start at 0 and loop when reaching the end.
  }

  checkScroll() {
    const el = this.scrollContainer.nativeElement;
    // The point where the second set begins is roughly half the total scrollable width
    // (Assuming the duplication is exactly half the content)
    const threshold = el.scrollWidth / 2;

    // Tolerance to ensure we don't jump too early, but effectively if we pass the threshold
    // we are looking at the clone of the first item.
    if (el.scrollLeft >= threshold) {
      // Teleport back to the beginning
      const offset = el.scrollLeft - threshold;
      el.scrollLeft = offset;

      // Crucial: If we are currently dragging, we must adjust our 'anchor' (initialScrollLeft)
      // because the coordinate system just shifted underneath the mouse cursor.
      if (this.isDragging()) {
        this.initialScrollLeft -= threshold;
      }
    }
  }

  startDrag(e: MouseEvent) {
    this.isDragging.set(true);
    const slider = this.scrollContainer.nativeElement;
    this.startX = e.pageX - slider.offsetLeft;
    this.initialScrollLeft = slider.scrollLeft;
  }

  stopDrag() {
    this.isDragging.set(false);
  }

  moveDrag(e: MouseEvent) {
    if (!this.isDragging()) return;
    
    e.preventDefault();
    const slider = this.scrollContainer.nativeElement;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - this.startX) * 1.5; // Speed multiplier
    
    // We use the stored initialScrollLeft as the anchor
    slider.scrollLeft = this.initialScrollLeft - walk;
  }
}