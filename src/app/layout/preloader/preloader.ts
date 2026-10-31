import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { gsap } from 'gsap';
import { Motion } from '../../shared/motion/motion';

/**
 * Opening curtain: the name rises letter by letter, a counter runs to 100 while the hero
 * photograph loads, then the curtain lifts and the hero plays. Skipped under reduced motion.
 */
@Component({
  selector: 'app-preloader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[class.is-gone]': 'gone()' },
  template: `
    <div class="panel">
      <div class="name">
        @for (l of letters; track $index) { <span class="l"><span>{{ l === ' ' ? ' ' : l }}</span></span> }
      </div>
      <p class="tag">Old Goan houses, restored</p>
      <div class="foot">
        <span>Bardez · Salcete · Tiswadi</span>
        <span class="count num">{{ count() }}</span>
      </div>
      <div class="bar"><i [style.transform]="'scaleX(' + count() / 100 + ')'"></i></div>
    </div>
  `,
  styles: `
    :host { position: fixed; inset: 0; z-index: 180; pointer-events: none; }
    :host(.is-gone) { display: none; }
    .panel {
      position: absolute; inset: 0; background: var(--bg); color: var(--ink);
      display: grid; place-content: center; justify-items: center; gap: 18px; padding: var(--pad);
      pointer-events: auto;
    }
    .name { font-family: var(--font-display); font-weight: 340; font-size: clamp(3rem, 11vw, 9.5rem); letter-spacing: -0.04em; line-height: 1; display: flex; }
    .l { display: inline-block; overflow: hidden; padding-bottom: .06em; }
    .l > span { display: inline-block; transform: translateY(105%); }
    .tag { font-family: var(--font-display); font-style: italic; font-weight: 300; font-size: clamp(1.1rem, 2vw, 1.6rem); color: var(--accent); opacity: 0; }
    .foot { position: absolute; left: var(--pad); right: var(--pad); bottom: 36px; display: flex; justify-content: space-between; align-items: end; color: var(--muted); font-size: var(--step-small); font-weight: 600; }
    .count { font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6rem); color: var(--ink); line-height: .8; font-weight: 300; }
    .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: var(--line); i { display: block; height: 100%; background: var(--accent); transform-origin: 0 50%; transform: scaleX(0); } }
  `,
})
export class Preloader {
  protected readonly letters = 'Balcão'.split('');
  protected readonly count = signal(0);
  protected readonly gone = signal(false);

  constructor() {
    const motion = inject(Motion);
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => {
      if (motion.reduced) { this.gone.set(true); motion.ready.set(true); return; }
      const panel = host.querySelector('.panel')!;
      const img = new Image();
      img.src = 'photos/in-goa-chandor-braganza-haus.jpg';
      const loaded = img.decode().catch(() => undefined);
      const o = { n: 0 };
      const tl = gsap.timeline();
      tl.fromTo(host.querySelectorAll('.l > span'), { yPercent: 105 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.06 })
        .to(host.querySelector('.tag'), { opacity: 1, duration: 0.8 }, '-=0.5')
        .to(o, { n: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => this.count.set(Math.round(o.n)) }, 0.1);
      tl.eventCallback('onComplete', () => {
        loaded.then(() => {
          gsap.timeline({ onComplete: () => this.gone.set(true) })
            .to(host.querySelectorAll('.l > span, .tag, .foot'), { yPercent: -60, opacity: 0, duration: 0.6, ease: 'power3.in', stagger: 0.02 })
            .to(panel, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.2')
            .add(() => motion.ready.set(true), '-=0.75');
        });
      });
    });
  }
}
