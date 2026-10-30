import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { gsap } from 'gsap';
import { Motion } from './motion';

/**
 * Moves the element vertically as the page scrolls past it (`appParallax` is the travel in %
 * of its own height; negative moves up). Usually put on an <img> inside an overflow:hidden frame.
 */
@Directive({ selector: '[appParallax]' })
export class Parallax {
  readonly amount = input(12, { alias: 'appParallax', transform: (v: number | string) => (v === '' ? 12 : Number(v)) });
  readonly scale = input(1.15);

  constructor() {
    const motion = inject(Motion);
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (motion.reduced) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(el, { yPercent: -this.amount(), scale: this.scale() }, {
          yPercent: this.amount(), scale: this.scale(), ease: 'none',
          scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      destroy.onDestroy(() => ctx.revert());
    });
  }
}

/** Counts a number up from zero when it scrolls into view. The final value is in the markup. */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  readonly value = input.required<number>({ alias: 'appCountUp' });
  readonly plain = input(false);

  constructor() {
    const motion = inject(Motion);
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (motion.reduced) return;
      const end = this.value();
      const fmt = (n: number) => (this.plain() ? String(Math.round(n)) : Math.round(n).toLocaleString('en-IN'));
      el.textContent = fmt(0);
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const o = { n: 0 };
        gsap.to(o, { n: end, duration: 2, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(o.n)) });
      }, { threshold: 0.6 });
      io.observe(el);
      destroy.onDestroy(() => io.disconnect());
    });
  }
}

/**
 * A paragraph whose words light up one by one as it is scrolled through: dim at first, full ink
 * once read. Words are split once; the scroll drives each word's opacity.
 */
@Directive({ selector: '[appScrollWords]' })
export class ScrollWords {
  constructor() {
    const motion = inject(Motion);
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (motion.reduced) return;
      const words: HTMLElement[] = [];
      const walk = (parent: Node) => {
        for (const node of Array.from(parent.childNodes)) {
          if (node.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            for (const p of (node.textContent ?? '').split(/(\s+)/)) {
              if (!p) continue;
              if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); continue; }
              const s = document.createElement('span');
              s.textContent = p;
              s.className = 'sw';
              words.push(s);
              frag.appendChild(s);
            }
            parent.replaceChild(frag, node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            walk(node);
          }
        }
      };
      walk(el);
      const ctx = gsap.context(() => {
        gsap.fromTo(words, { opacity: 0.16 }, {
          opacity: 1, stagger: 0.08, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        });
      });
      destroy.onDestroy(() => ctx.revert());
    });
  }
}
