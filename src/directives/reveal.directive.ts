import { Directive, ElementRef, inject, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    // Add will-change to hint the browser about upcoming animations
    this.el.nativeElement.classList.add(
      'opacity-0', 
      'translate-y-8', 
      'transition-all', 
      'duration-700', 
      'ease-out',
      'will-change-[opacity,transform]'
    );

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.remove('opacity-0', 'translate-y-8');
          this.el.nativeElement.classList.add('opacity-100', 'translate-y-0');
          
          // Clean up will-change after animation is likely done (optional but good practice)
          setTimeout(() => {
            this.el.nativeElement.classList.remove('will-change-[opacity,transform]');
          }, 1000);

          this.observer?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      // Increased rootMargin slightly to trigger a bit earlier for smoother scrolling feel
      rootMargin: '0px 0px -30px 0px'
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}