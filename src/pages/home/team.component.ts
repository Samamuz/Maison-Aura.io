import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RevealDirective, NgOptimizedImage],
  template: `
    <section id="team" class="py-32 px-6 bg-white">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Text Column -->
          <div appReveal class="lg:col-span-4 lg:sticky lg:top-32">
            <span class="text-bronze text-xs uppercase tracking-widest mb-4 block">Les Experts</span>
            <h2 class="font-serif text-4xl md:text-5xl italic text-deepBlack mb-8">L'Âme de la Maison</h2>
            <p class="text-charcoal/70 mb-8 leading-relaxed">
              Une équipe passionnée, formée aux dernières techniques internationales de Londres à Tokyo. Chacun apporte sa signature unique pour sublimer votre style, dans une approche respectueuse de la matière.
            </p>
            <p class="text-charcoal/70 leading-relaxed">
              "La technique ne doit jamais se voir, elle doit se ressentir dans le mouvement et la lumière du cheveu."
            </p>
          </div>

          <!-- Asymmetric Grid Images -->
          <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Column 1: One tall image -->
            <div class="flex flex-col gap-6 pt-12">
               <div appReveal class="relative group overflow-hidden h-[600px]">
                  <img src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop" width="400" height="600" alt="Thomas" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"/>
                  <div class="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p class="text-ivory font-serif text-2xl italic">Thomas</p>
                    <p class="text-ivory/70 text-xs uppercase tracking-widest mt-1">Directeur Artistique</p>
                    <p class="text-ivory/60 text-sm mt-3 font-light">Spécialiste coupe à sec & architecture du cheveu.</p>
                  </div>
               </div>
            </div>

            <!-- Column 2: Two stacked images -->
            <div class="flex flex-col gap-6">
              <div appReveal class="relative group overflow-hidden h-[400px]">
                 <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop" width="400" height="500" alt="Sarah" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"/>
                 <div class="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <p class="text-ivory font-serif text-xl italic">Sarah</p>
                   <p class="text-ivory/70 text-xs uppercase tracking-widest">Maître Coloriste</p>
                 </div>
              </div>

              <div appReveal class="relative group overflow-hidden h-[400px]">
                 <img src="https://images.unsplash.com/photo-1522337360705-8754d1a2e284?q=80&w=800&auto=format&fit=crop" width="400" height="500" alt="Lucas" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"/>
                 <div class="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <p class="text-ivory font-serif text-xl italic">Lucas</p>
                   <p class="text-ivory/70 text-xs uppercase tracking-widest">Expert Soins & Textures</p>
                 </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  `
})
export class TeamComponent {}