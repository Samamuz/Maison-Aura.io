import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatWidgetComponent } from './components/features/chat-widget.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatWidgetComponent, CommonModule],
  template: `
    <router-outlet></router-outlet>
    <app-chat-widget />
    
    <!-- Custom Cursor Element (Visual only, simple implementation) -->
    <div id="cursor-dot" class="fixed top-0 left-0 w-2 h-2 bg-bronze rounded-full pointer-events-none z-[100] transition-transform duration-100 ease-out hidden md:block"></div>
    <div id="cursor-outline" class="fixed top-0 left-0 w-8 h-8 border border-bronze/50 rounded-full pointer-events-none z-[100] transition-transform duration-300 ease-out -translate-x-3 -translate-y-3 hidden md:block"></div>
  `
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Check if we are in the browser to run animations/timeouts correctly
    if (isPlatformBrowser(this.platformId)) {
      // Simple custom cursor logic using vanilla JS for performance
      window.addEventListener('mousemove', (e) => {
        const dot = document.getElementById('cursor-dot');
        const outline = document.getElementById('cursor-outline');
        
        if (dot && outline) {
           dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
           outline.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
        }
      });
    }
  }
}