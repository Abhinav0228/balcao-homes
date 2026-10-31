import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOUSES } from '../../../../core/data/houses';
import { Motion } from '../../../../shared/motion/motion';

/**
 * Two bands of the villages our houses stand in, running in opposite directions. Scrolling
 * speeds them up and flips their direction, so the band answers the visitor's hand.
 */
@Component({
  selector: 'app-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-label': 'Villages where our houses stand', role: 'region' },
  template: `
    <div class="band one" aria-hidden="true">
      <div class="track">
        @for (r of [0, 1]; track r) {
          <span class="set">@for (v of villages; track v) { <span class="v">{{ v }}</span><span class="star">✦</span> }</span>
        }
      </div>
    </div>
    <div class="band two" aria-hidden="true">
      <div class="track">
        @for (r of [0, 1]; track r) {
          <span class="set">@for (w of words; track w) { <span class="w">{{ w }}</span><span class="dot"></span> }</span>
        }
      </div>
    </div>
    <p class="visually-hidden">Houses in {{ villages.join(', ') }}.</p>
  `,
  styles: `
    :host { display: block; position: relative; padding: clamp(40px, 6vw, 80px) 0; overflow: hidden; background: var(--bg); }
    .band { display: flex; white-space: nowrap; }
    .track { display: flex; will-change: transform; }
    .set { display: flex; align-items: center; flex-shrink: 0; }
    .one { font-family: var(--font-display); font-weight: 330; font-size: clamp(3rem, 8vw, 7.5rem); letter-spacing: -0.04em; line-height: 1.1; }
    .v { padding: 0 .35em; }
    .v:nth-child(4n + 3) { font-style: italic; font-weight: 300; color: var(--accent); }
    .star { font-size: .35em; color: var(--laterite); }
    .two { margin-top: 10px; transform: rotate(-1.5deg); background: var(--accent); color: var(--accent-ink); padding: 14px 0; }
    .w { font-weight: 800; font-size: clamp(1rem, 1.6vw, 1.35rem); padding: 0 22px; letter-spacing: .01em; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-ink); }
  `,
})
export class Marquee {
  protected readonly villages = [...new Set(HOUSES.map((h) => h.village.split(',')[0]))];
  protected readonly words = ['Clear titles', 'Lime & laterite', 'Oyster-shell windows', 'Teak & clay tile', 'Keys in nine months', 'Two prices for every house', 'Saturday visits'];

  constructor() {
    const motion = inject(Motion);
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (motion.reduced) return;
      const make = (track: HTMLElement, dir: 1 | -1, speed: number) => {
        let x = dir === 1 ? 0 : -50;
        let boost = 0;
        let sign: number = dir;
        const tick = () => {
          x -= (speed + boost) * sign * 0.01;
          if (x <= -50) x += 50;
          if (x > 0) x -= 50;
          track.style.transform = `translate3d(${x}%,0,0)`;
          boost *= 0.92;
        };
        gsap.ticker.add(tick);
        const st = ScrollTrigger.create({
          trigger: host, start: 'top bottom', end: 'bottom top',
          onUpdate: (self) => { boost = Math.min(Math.abs(self.getVelocity()) / 60, 40); sign = self.direction === 1 ? dir : -dir; },
        });
        return () => { gsap.ticker.remove(tick); st.kill(); };
      };
      const tracks = host.querySelectorAll<HTMLElement>('.track');
      const offs = [make(tracks[0], 1, 3.2), make(tracks[1], -1, 4)];
      destroy.onDestroy(() => offs.forEach((f) => f()));
    });
  }
}
