import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-deepBlack text-offWhite py-20 px-6">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div class="col-span-1 md:col-span-1">
             <h2 class="font-serif text-2xl italic mb-6">Maison Aura</h2>
             <p class="text-white/60 text-sm leading-relaxed">
               L'excellence capillaire est une question de détails. Une expérience sensorielle unique au cœur de la ville.
             </p>
          </div>

          <div>
            <h3 class="text-xs uppercase tracking-widest text-bronze mb-6">Explorer</h3>
            <ul class="space-y-4 text-sm text-white/80">
              <li><a routerLink="/" fragment="services" class="hover:text-white transition-colors relative group">
                Services
                <span class="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a></li>
              <li><a routerLink="/" fragment="gallery" class="hover:text-white transition-colors relative group">
                Galerie
                <span class="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a></li>
              <li><a routerLink="/booking" class="hover:text-white transition-colors relative group">
                Réserver
                <span class="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs uppercase tracking-widest text-bronze mb-6">Contact</h3>
            <ul class="space-y-4 text-sm text-white/80">
              <li>12 Rue du Faubourg, Paris</li>
              <li>+33 1 40 20 30 40</li>
              <li>bonjour@maisonaura.com</li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs uppercase tracking-widest text-bronze mb-6">Social</h3>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">IG</a>
              <a href="#" class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">FB</a>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
          <p>&copy; 2024 Maison Aura. Tous droits réservés.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-white">Mentions Légales</a>
            <a href="#" class="hover:text-white">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}