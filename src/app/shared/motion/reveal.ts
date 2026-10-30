import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { Motion } from './motion';

/**
 * Section entrance. When the host scrolls into view it gets `.is-in`; its [data-rise] and
 * [data-curtain] children then arrive in reading order, `step` ms apart. Content stays visible
 * if scripts fail or motion is reduced (the hidden state needs html.js-motion).
 */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  readonly step = input(80, { alias: 'appReveal', transform: (v: number | string) => (v === '' ? 80 : Number(v)) });

  constructor() {
    const motion = inject(Motion);
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (motion.reduced || typeof IntersectionObserver === 'undefined') { el.classList.add('is-in'); return; }
      el.querySelectorAll<HTMLElement>('[data-rise], [data-curtain]').forEach((c, i) => {
        if (!c.style.getPropertyValue('--rise-delay')) c.style.setProperty('--rise-delay', `${i * this.step()}ms`);
      });
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
      }, { rootMargin: '0px 0px -12% 0px' });
      io.observe(el);
      destroy.onDestroy(() => io.disconnect());
    });
  }
}
