import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { gsap } from 'gsap';
import { HomeState } from '../../home-state';
import { HouseElevation } from '../../../../shared/ui/house-elevation/house-elevation';
import { Reveal } from '../../../../shared/motion/reveal';
import { SplitText } from '../../../../shared/motion/split-text';
import { Magnetic } from '../../../../shared/motion/pointer';
import { Motion } from '../../../../shared/motion/motion';
import { Arrow } from '../../../../shared/ui/arrow';
import { InrPipe } from '../../../../shared/pipes/inr';
import { formatInr } from '../../../../core/utils/inr';
import { SITE } from '../../../../core/data/site';
import { Condition } from '../../../../core/models';

/**
 * The live part of the page. Choose a house; drag the divider across its drawing to see it as
 * found and restored; pick which price you want; set a down payment and read the monthly
 * instalment, which counts to its new value whenever anything changes.
 */
@Component({
  selector: 'app-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HouseElevation, Reveal, SplitText, Magnetic, Arrow, InrPipe],
  templateUrl: './showcase.html',
  styleUrl: './showcase.scss',
})
export class Showcase {
  protected readonly state = inject(HomeState);
  private readonly motion = inject(Motion);
  protected readonly site = SITE;
  protected readonly ratePct = (SITE.loanRate * 100).toFixed(2).replace(/0$/, '');

  /** Position of the before/after divider, in % from the left. Left of it: as found. */
  protected readonly split = signal(50);
  /** The monthly figure as shown, tweened towards the real value. */
  protected readonly shownMonthly = signal(this.state.monthly());
  protected readonly monthlyText = computed(() => formatInr(this.shownMonthly()));
  protected readonly downPct = computed(() => Math.round(this.state.downShare() * 100));
  protected readonly loanShare = computed(() => 100 - this.downPct());

  protected readonly visitHref = computed(() => {
    const h = this.state.house();
    const subject = `Visit: ${h.name}, ${h.village}`;
    const body = `Hello Balcão Homes,\n\nI would like to see ${h.name} in ${h.village}` +
      ` (${this.state.condition() === 'found' ? 'as found' : 'restored'}, ${formatInr(this.state.price())}). Which Saturday would suit?\n\n`;
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  constructor() {
    const tween = { n: this.state.monthly() };
    effect(() => {
      const target = this.state.monthly();
      if (this.motion.reduced) { this.shownMonthly.set(target); return; }
      gsap.to(tween, { n: target, duration: 0.9, ease: 'power3.out', overwrite: true, onUpdate: () => this.shownMonthly.set(tween.n) });
    });
    inject(DestroyRef).onDestroy(() => gsap.killTweensOf(tween));
  }

  protected setCondition(c: Condition): void {
    this.state.condition.set(c);
    this.split.set(c === 'found' ? 88 : 12);
  }

  protected setSplit(event: Event): void {
    const v = Number((event.target as HTMLInputElement).value);
    this.split.set(v);
  }

  protected setDown(event: Event): void {
    this.state.downShare.set(Number((event.target as HTMLInputElement).value) / 100);
  }

  protected pick(id: string): void {
    this.state.select(id);
    this.split.set(50);
  }
}
