import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="intro" class="py-32 px-6 bg-ivory text-center">
      <div class="container mx-auto max-w-3xl">
        <div appReveal class="space-y-8">
          <span class="block w-[1px] h-16 bg-bronze mx-auto mb-8"></span>
          
          <h2 class="font-serif text-3xl md:text-5xl text-deepBlack leading-snug">
            "Nous croyons que la beauté réside dans l'harmonie entre votre personnalité et notre savoir-faire."
          </h2>

          <p class="font-sans text-charcoal/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Chez Maison Aura, chaque rendez-vous est une cérémonie. Nous prenons le temps d'écouter, d'observer et de comprendre pour révéler votre nature la plus authentique.
          </p>
          
          <div class="pt-8">
            <span class="font-serif text-xl italic text-bronze">- Élodie & Thomas, Fondateurs</span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class IntroComponent {}