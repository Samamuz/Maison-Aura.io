import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { ButtonComponent } from '../../components/ui/button.component';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent, ButtonComponent, RevealDirective],
  template: `
    <app-header />
    <main class="pt-32 pb-20 px-6 bg-ivory min-h-screen">
      <div class="container mx-auto max-w-5xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <!-- Contact Info -->
          <div appReveal class="space-y-8">
            <div>
              <span class="text-bronze text-xs uppercase tracking-widest mb-4 block">Rendez-vous</span>
              <h1 class="font-serif text-5xl italic text-deepBlack mb-6">Réservez votre moment</h1>
              <p class="text-charcoal/70 leading-relaxed">
                Pour toute demande spécifique ou privatisation, n'hésitez pas à nous contacter directement par téléphone.
              </p>
            </div>

            <div class="space-y-6 pt-8 border-t border-charcoal/10">
              <div>
                <h3 class="font-serif text-xl italic mb-2">Horaires</h3>
                <p class="text-sm text-charcoal/60">Mardi - Samedi : 10h - 19h</p>
                <p class="text-sm text-charcoal/60">Nocturne le Jeudi jusqu'à 21h</p>
              </div>
              <div>
                <h3 class="font-serif text-xl italic mb-2">Contact</h3>
                <p class="text-sm text-charcoal/60">+33 1 40 20 30 40</p>
                <p class="text-sm text-charcoal/60">bonjour@maisonaura.com</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div appReveal class="bg-white p-8 md:p-12 shadow-sm border border-black/5">
            <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="space-y-6">
              
              <!-- Name Input -->
              <div class="relative pt-4">
                <input 
                  type="text" 
                  id="name" 
                  formControlName="name"
                  class="peer w-full border-b border-charcoal/20 bg-transparent py-2 text-sm text-deepBlack focus:border-bronze focus:outline-none transition-colors"
                  placeholder=" "
                />
                <label 
                  for="name" 
                  class="absolute left-0 top-2 text-xs text-charcoal/50 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-bronze">
                  Nom Complet
                </label>
              </div>

              <!-- Email Input -->
              <div class="relative pt-4">
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email"
                  class="peer w-full border-b border-charcoal/20 bg-transparent py-2 text-sm text-deepBlack focus:border-bronze focus:outline-none transition-colors"
                  placeholder=" "
                />
                <label 
                  for="email" 
                  class="absolute left-0 top-2 text-xs text-charcoal/50 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-bronze">
                  Email
                </label>
              </div>

              <!-- Service Selection -->
              <div class="relative pt-4">
                <select 
                  formControlName="service"
                  class="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm text-deepBlack focus:border-bronze focus:outline-none rounded-none appearance-none">
                  <option value="" disabled selected>Choisir un service</option>
                  <option value="coupe">Coupe Signature</option>
                  <option value="balayage">Balayage Lumière</option>
                  <option value="soin">Soin Tokyo</option>
                  <option value="couleur">Coloration Végétale</option>
                </select>
                <div class="absolute right-0 top-6 pointer-events-none text-charcoal/40">▼</div>
              </div>

              <!-- Date Input -->
              <div class="relative pt-4">
                 <input 
                  type="date" 
                  id="date" 
                  formControlName="date"
                  class="peer w-full border-b border-charcoal/20 bg-transparent py-2 text-sm text-deepBlack focus:border-bronze focus:outline-none transition-colors"
                />
                <label for="date" class="absolute left-0 -top-1 text-xs text-charcoal/50">Date souhaitée</label>
              </div>

              <div class="pt-8">
                <app-button [fullWidth]="true" [disabled]="bookingForm.invalid || isSubmitting()">
                  {{ isSubmitting() ? 'Envoi en cours...' : 'Confirmer la demande' }}
                </app-button>
                @if (successMessage()) {
                  <p class="mt-4 text-center text-green-600 text-sm animate-pulse">
                    Demande envoyée avec succès. Nous vous rappellerons sous 2h.
                  </p>
                }
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
    <app-footer />
  `
})
export class BookingComponent {
  bookingForm: FormGroup;
  isSubmitting = signal(false);
  successMessage = signal(false);

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.isSubmitting.set(true);
      
      // Compile form data to JSON and log it (as per request)
      const jsonData = JSON.stringify(this.bookingForm.value, null, 2);
      console.log('Booking Data Compiled to JSON:', jsonData);

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.successMessage.set(true);
        this.bookingForm.reset();
        setTimeout(() => this.successMessage.set(false), 5000);
      }, 1500);
    }
  }
}