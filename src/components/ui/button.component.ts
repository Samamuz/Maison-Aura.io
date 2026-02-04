import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="onClick.emit($event)"
      [class]="'group relative overflow-hidden px-8 py-4 transition-all duration-300 ' + customClass()"
      [disabled]="disabled()">
      <span [class]="'relative z-10 flex items-center justify-center gap-2 font-sans text-sm tracking-widest uppercase ' + textClass()">
        <ng-content></ng-content>
      </span>
      
      <!-- Hover Fill Effect -->
      <div 
        [class]="'absolute inset-0 z-0 h-full w-full translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 ' + fillClass()">
      </div>
    </button>
  `
})
export class ButtonComponent {
  variant = input<'primary' | 'outline' | 'dark'>('primary');
  disabled = input(false);
  fullWidth = input(false);
  onClick = output<MouseEvent>();

  customClass = computed(() => {
    const base = this.fullWidth() ? 'w-full' : 'inline-block';
    switch (this.variant()) {
      case 'primary': return `${base} bg-deepBlack text-ivory border border-deepBlack`;
      case 'outline': return `${base} bg-transparent text-deepBlack border border-deepBlack`;
      case 'dark': return `${base} bg-ivory text-deepBlack border border-ivory`;
      default: return base;
    }
  });

  textClass = computed(() => {
    switch (this.variant()) {
      case 'dark': return 'group-hover:text-ivory transition-colors duration-300';
      default: return 'group-hover:text-ivory transition-colors duration-300';
    }
  });

  fillClass = computed(() => {
    switch (this.variant()) {
      case 'dark': return 'bg-bronze';
      case 'outline': return 'bg-deepBlack';
      default: return 'bg-bronze';
    }
  });
}