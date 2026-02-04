import { Component, HostListener, signal } from '@angular/core';
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
      [class.bg-ivory/80]="isScrolled()"
      [class.backdrop-blur-md]="isScrolled()"
      [class.border-b]="isScrolled()"
      [class.border-deepBlack/5]="isScrolled()"
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out">
      
      <div class="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <!-- Desktop Nav Left -->
        <nav class="hidden md:flex items-center gap-8">
          <a routerLink="/" fragment="services" class="text-xs uppercase tracking-widest text-charcoal hover:text-bronze transition-colors">Services</a>
          <a routerLink="/" fragment="gallery" class="text-xs uppercase tracking-widest text-charcoal hover:text-bronze transition-colors">Galerie</a>
        </nav>

        <!-- Logo -->
        <a routerLink="/" class="relative z-10 group">
          <h1 class="font-serif text-3xl italic text-deepBlack tracking-tight">Maison Aura</h1>
        </a>

        <!-- Desktop Nav Right -->
        <nav class="hidden md:flex items-center gap-8">
          <a routerLink="/" fragment="team" class="text-xs uppercase tracking-widest text-charcoal hover:text-bronze transition-colors">L'Équipe</a>
          <a routerLink="/booking" class="text-xs uppercase tracking-widest text-ivory bg-deepBlack px-6 py-2 hover:bg-bronze transition-colors duration-300">Réserver</a>
        </nav>

        <!-- Mobile Menu Button -->
        <button (click)="toggleMenu()" class="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center gap-1.5 group">
          <span [class.rotate-45]="isMenuOpen()" [class.translate-y-2]="isMenuOpen()" class="w-full h-[1px] bg-deepBlack transition-transform duration-300 origin-center"></span>
          <span [class.opacity-0]="isMenuOpen()" class="w-full h-[1px] bg-deepBlack transition-opacity duration-300"></span>
          <span [class.-rotate-45]="isMenuOpen()" [class.-translate-y-2.5]="isMenuOpen()" class="w-full h-[1px] bg-deepBlack transition-transform duration-300 origin-center"></span>
        </button>
      </div>

      <!-- Mobile Overlay -->
      <div 
        [class.opacity-0]="!isMenuOpen()" 
        [class.pointer-events-none]="!isMenuOpen()"
        class="fixed inset-0 bg-ivory z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-500 md:hidden">
        <a (click)="closeMenu()" routerLink="/" fragment="services" class="font-serif text-3xl italic text-deepBlack">Services</a>
        <a (click)="closeMenu()" routerLink="/" fragment="gallery" class="font-serif text-3xl italic text-deepBlack">Galerie</a>
        <a (click)="closeMenu()" routerLink="/" fragment="team" class="font-serif text-3xl italic text-deepBlack">L'Équipe</a>
        <a (click)="closeMenu()" routerLink="/booking" class="font-sans text-xs uppercase tracking-widest bg-deepBlack text-ivory px-8 py-3">Réserver</a>
      </div>
    </header>
  `
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);

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