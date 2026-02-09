import { Component, HostListener, signal, effect, inject, Renderer2, DOCUMENT } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header 
      [class.py-4]="isScrolled()"
      [class.py-8]="!isScrolled()"
      [class.bg-ivory]="isMenuOpen()"
      [class.bg-ivory/80]="isScrolled() && !isMenuOpen()"
      [class.bg-transparent]="!isScrolled() && !isMenuOpen()"
      [class.backdrop-blur-md]="isScrolled() && !isMenuOpen()"
      [class.backdrop-blur-none]="!isScrolled() || isMenuOpen()"
      [class.border-deepBlack/5]="isScrolled() && !isMenuOpen()"
      [class.border-transparent]="!isScrolled() || isMenuOpen()"
      class="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
      
      <div class="container mx-auto px-6 md:px-12 flex justify-between items-center relative">
        <!-- Desktop Nav Left -->
        <nav class="hidden md:flex items-center gap-8">
          <a routerLink="/" fragment="services" class="text-xs uppercase tracking-widest text-charcoal hover:text-bronze transition-colors">Services</a>
          <a routerLink="/" fragment="gallery" class="text-xs uppercase tracking-widest text-charcoal hover:text-bronze transition-colors">Galerie</a>
        </nav>

        <!-- Logo -->
        <a routerLink="/" (click)="closeMenu()" class="relative z-[51] group">
          <h1 class="font-serif text-3xl italic text-deepBlack tracking-tight">Maison Aura</h1>
        </a>

        <!-- Desktop Nav Right -->
        <nav class="hidden md:flex items-center gap-8">
          <a routerLink="/" fragment="team" class="text-xs uppercase tracking-widest text-charcoal hover:text-bronze transition-colors">L'Équipe</a>
          <a routerLink="/booking" class="text-xs uppercase tracking-widest text-ivory bg-deepBlack px-6 py-2 hover:bg-bronze transition-colors duration-300">Réserver</a>
        </nav>

        <!-- Mobile Menu Button -->
        <button (click)="toggleMenu()" class="md:hidden relative z-[51] w-10 h-10 flex flex-col justify-center items-center gap-[6px] group">
          <span 
            [class.rotate-45]="isMenuOpen()" 
            [class.translate-y-[7px]]="isMenuOpen()" 
            class="w-6 h-[1px] bg-deepBlack transition-all duration-300 origin-center">
          </span>
          <span 
            [class.opacity-0]="isMenuOpen()" 
            class="w-6 h-[1px] bg-deepBlack transition-opacity duration-300">
          </span>
          <span 
            [class.-rotate-45]="isMenuOpen()" 
            [class.-translate-y-[7px]]="isMenuOpen()" 
            class="w-6 h-[1px] bg-deepBlack transition-all duration-300 origin-center">
          </span>
        </button>
      </div>

      <!-- Mobile Overlay - Ultra Smooth Slide Down Animation -->
      <div 
        [class.-translate-y-full]="!isMenuOpen()" 
        [class.translate-y-0]="isMenuOpen()"
        class="fixed inset-0 h-[100dvh] bg-ivory z-40 flex flex-col items-center justify-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden will-change-transform">
        
        <!-- Navigation Links Container with Resynced Staggered Animation -->
        <nav class="flex flex-col items-center gap-8">
          
          <a (click)="closeMenu()" routerLink="/" fragment="services" 
             [class.translate-y-12]="!isMenuOpen()"
             [class.opacity-0]="!isMenuOpen()"
             [class.delay-[400ms]]="isMenuOpen()"
             class="font-serif text-4xl italic text-deepBlack transition-all duration-[1200ms] ease-out">
             Services
          </a>
          
          <a (click)="closeMenu()" routerLink="/" fragment="gallery" 
             [class.translate-y-12]="!isMenuOpen()"
             [class.opacity-0]="!isMenuOpen()"
             [class.delay-[500ms]]="isMenuOpen()"
             class="font-serif text-4xl italic text-deepBlack transition-all duration-[1200ms] ease-out">
             Galerie
          </a>
          
          <a (click)="closeMenu()" routerLink="/" fragment="team" 
             [class.translate-y-12]="!isMenuOpen()"
             [class.opacity-0]="!isMenuOpen()"
             [class.delay-[600ms]]="isMenuOpen()"
             class="font-serif text-4xl italic text-deepBlack transition-all duration-[1200ms] ease-out">
             L'Équipe
          </a>
          
          <div 
             [class.translate-y-12]="!isMenuOpen()"
             [class.opacity-0]="!isMenuOpen()"
             [class.delay-[700ms]]="isMenuOpen()"
             class="mt-4 transition-all duration-[1200ms] ease-out">
            <a (click)="closeMenu()" routerLink="/booking" class="font-sans text-xs uppercase tracking-widest bg-deepBlack text-ivory px-10 py-4 hover:bg-bronze transition-colors">
              Réserver
            </a>
          </div>

        </nav>
      </div>
    </header>
  `
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  constructor() {
    // Effect to handle body scroll locking when menu is open
    effect(() => {
      if (this.isMenuOpen()) {
        this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
      } else {
        this.renderer.removeStyle(this.document.body, 'overflow');
      }
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}