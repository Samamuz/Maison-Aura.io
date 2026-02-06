import { Directive, ElementRef, inject, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    this.el.nativeElement.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.remove('opacity-0', 'translate-y-8');
          this.el.nativeElement.classList.add('opacity-100', 'translate-y-0');
          this.observer?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}