import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { Motion } from './motion';

/** Pulls the element a little towards the pointer while it hovers. Desktop only. */
@Directive({ selector: '[appMagnetic]' })
export class Magnetic {
  readonly strength = input(0.28, { alias: 'appMagnetic', transform: (v: number | string) => (v === '' ? 0.28 : Number(v)) });

  constructor() {
    const motion = inject(Motion);
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (!motion.fine || motion.reduced) return;
      el.style.transition = 'transform 600ms cubic-bezier(.22,1,.36,1)';
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const s = this.strength();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * s}px, ${(e.clientY - r.top - r.height / 2) * s}px)`;
      };
      const leave = () => (el.style.transform = '');
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      destroy.onDestroy(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
    });
  }
}

/** Tilts a card in 3D towards the pointer and moves a soft light across it. Desktop only. */
@Directive({ selector: '[appTilt]' })
export class Tilt {
  readonly max = input(8, { alias: 'appTilt', transform: (v: number | string) => (v === '' ? 8 : Number(v)) });

  constructor() {
    const motion = inject(Motion);
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (!motion.fine || motion.reduced) return;
      el.style.transformStyle = 'preserve-3d';
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.transition = 'transform 120ms linear';
        el.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * this.max()}deg) rotateX(${(0.5 - y) * this.max()}deg)`;
        el.style.setProperty('--mx', `${x * 100}%`);
        el.style.setProperty('--my', `${y * 100}%`);
      };
      const leave = () => {
        el.style.transition = 'transform 700ms cubic-bezier(.22,1,.36,1)';
        el.style.transform = '';
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      destroy.onDestroy(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
    });
  }
}
