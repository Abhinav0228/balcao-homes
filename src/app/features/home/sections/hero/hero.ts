import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { gsap } from 'gsap';
import { PHOTOS } from '../../../../core/data/photos';
import { Motion } from '../../../../shared/motion/motion';
import { SplitText } from '../../../../shared/motion/split-text';
import { Magnetic, Tilt } from '../../../../shared/motion/pointer';
import { Arrow } from '../../../../shared/ui/arrow';
import { HouseElevation } from '../../../../shared/ui/house-elevation/house-elevation';
import { InrPipe } from '../../../../shared/pipes/inr';
import { HomeState } from '../../home-state';

/**
 * First screen: a full-bleed slideshow of Goan houses with a slow zoom, the headline rising word
 * by word once the preloader lifts, two actions, a featured-house card and the slide counter.
 */
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SplitText, Magnetic, Tilt, Arrow, HouseElevation, InrPipe],
  host: { '[class.is-ready]': 'motion.ready()' },
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly motion = inject(Motion);
  protected readonly state = inject(HomeState);
  protected readonly slides = [PHOTOS.braganza, PHOTOS.natal, PHOTOS.blueHouse, PHOTOS.ballroom];
  protected readonly index = signal(0);
  protected readonly current = computed(() => this.slides[this.index()]);
  protected readonly featured = this.state.featured[0];
  protected readonly duration = 6500;

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (!this.motion.reduced) this.play();
      if (this.motion.reduced) return;
      // The photograph sinks and darkens as the page scrolls away from the hero.
      const ctx = gsap.context(() => {
        gsap.to(host.querySelector('.slides'), {
          yPercent: 18, ease: 'none',
          scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(host.querySelector('.content'), {
          yPercent: -18, opacity: 0.2, ease: 'none',
          scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
      destroy.onDestroy(() => ctx.revert());
    });
    destroy.onDestroy(() => clearInterval(this.timer));
  }

  protected goTo(i: number): void {
    this.index.set((i + this.slides.length) % this.slides.length);
    if (!this.motion.reduced) this.play();
  }

  protected scroll(event: Event, href: string): void {
    event.preventDefault();
    this.motion.scrollTo(href);
  }

  private play(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.index.update((i) => (i + 1) % this.slides.length), this.duration);
  }
}
