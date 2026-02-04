import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { RouterLink } from '@angular/router';

interface Service {
  name: string;
  price: string;
  description: string;
  duration: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective, RouterLink],
  template: `
    <section id="services" class="bg-deepBlack text-offWhite py-32 px-6">
      <div class="container mx-auto max-w-4xl">
        <div appReveal class="mb-20 text-center">
          <span class="text-bronze text-xs uppercase tracking-widest mb-4 block">Notre Carte</span>
          <h2 class="font-serif text-4xl md:text-5xl italic text-ivory">Soins & Services</h2>
        </div>

        <div class="flex flex-col">
          @for (service of services; track $index) {
            <div appReveal class="border-t border-white/10 group">
              <button 
                (click)="toggle($index)"
                class="w-full py-8 flex justify-between items-center text-left hover:text-bronze transition-colors duration-300">
                <span class="font-serif text-2xl md:text-3xl italic">{{ service.name }}</span>
                <div class="flex items-center gap-8">
                  <span class="font-sans text-sm tracking-wider opacity-60">{{ service.price }}</span>
                  <span class="transform transition-transform duration-300 text-bronze" [class.rotate-45]="expandedIndex() === $index">+</span>
                </div>
              </button>
              
              <div 
                [class.max-h-0]="expandedIndex() !== $index"
                [class.max-h-64]="expandedIndex() === $index"
                [class.opacity-0]="expandedIndex() !== $index"
                [class.opacity-100]="expandedIndex() === $index"
                class="overflow-hidden transition-all duration-500 ease-in-out">
                <div class="pb-8 pl-0 md:pl-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                  <p class="text-white/60 text-sm max-w-lg leading-relaxed">
                    {{ service.description }}
                  </p>
                  <div class="flex items-center gap-6 shrink-0">
                     <span class="text-xs uppercase tracking-wider text-white/40">{{ service.duration }}</span>
                     <a routerLink="/booking" class="text-xs uppercase tracking-widest border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all">Réserver</a>
                  </div>
                </div>
              </div>
            </div>
          }
          <div class="border-t border-white/10"></div>
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {
  expandedIndex = signal<number | null>(0);

  services: Service[] = [
    {
      name: "La Coupe Signature",
      price: "95€",
      description: "Une consultation approfondie suivie d'un shampoing relaxant, d'une coupe structurée sur-mesure et d'un coiffage naturel. L'essence de notre savoir-faire.",
      duration: "1h 15min"
    },
    {
      name: "Balayage Lumière",
      price: "à partir de 160€",
      description: "Notre technique exclusive pour apporter de la profondeur et des reflets naturels comme au retour de vacances. Patine incluse pour une brillance absolue.",
      duration: "2h 30min"
    },
    {
      name: "Soin Profond Tokyo",
      price: "120€",
      description: "Le rituel japonais légendaire pour réparer intensément la fibre capillaire. 5 étapes pour des cheveux transformés, soyeux et légers.",
      duration: "1h 00min"
    },
    {
      name: "Coloration Végétale",
      price: "110€",
      description: "Une approche douce de la couleur, respectueuse de votre cuir chevelu et de l'environnement. Couvrance parfaite et reflets chauds.",
      duration: "2h 00min"
    }
  ];

  toggle(index: number) {
    this.expandedIndex.update(current => current === index ? null : index);
  }
}