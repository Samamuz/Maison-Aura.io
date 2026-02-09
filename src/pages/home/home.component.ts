import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { HeroComponent } from './hero.component';
import { IntroComponent } from './intro.component';
import { ServicesComponent } from './services.component';
import { GalleryComponent } from './gallery.component';
import { TeamComponent } from './team.component';
import { TestimonialsComponent } from './testimonials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    IntroComponent,
    ServicesComponent,
    GalleryComponent,
    TeamComponent,
    TestimonialsComponent
  ],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-intro />
      <app-services />
      <app-gallery />
      <app-team />
      <app-testimonials />
    </main>
    <app-footer />
  `
})
export class HomeComponent {}