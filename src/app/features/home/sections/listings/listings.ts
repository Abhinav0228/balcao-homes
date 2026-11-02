import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, viewChild } from '@angular/core';
import { HomeState } from '../../home-state';
import { Reveal } from '../../../../shared/motion/reveal';
import { SplitText } from '../../../../shared/motion/split-text';
import { Tilt } from '../../../../shared/motion/pointer';
import { Motion } from '../../../../shared/motion/motion';
import { HouseElevation } from '../../../../shared/ui/house-elevation/house-elevation';
import { Arrow } from '../../../../shared/ui/arrow';
import { InrPipe } from '../../../../shared/pipes/inr';
import { TALUKAS } from '../../../../core/data/houses';
import { SITE } from '../../../../core/data/site';
import { House, Taluka } from '../../../../core/models';

/**
 * Every house on our books as a card: filter by taluka, sort by price or age, open one to read
 * it in a side drawer, or send it to the calculator.
 */
@Component({
  selector: 'app-listings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SplitText, Tilt, HouseElevation, Arrow, InrPipe],
  templateUrl: './listings.html',
  styleUrl: './listings.scss',
})
export class Listings {
  protected readonly state = inject(HomeState);
  private readonly motion = inject(Motion);
  protected readonly filters: (Taluka | 'All')[] = ['All', ...TALUKAS];
  protected readonly counts = computed(() => {
    const out: Record<string, number> = { All: this.state.houses.length };
    for (const t of TALUKAS) out[t] = this.state.houses.filter((h) => h.taluka === t).length;
    return out;
  });
  /** Bumped on every filter change so the grid replays its entrance. */
  protected generation = 0;

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('drawer');

  constructor() {
    effect(() => {
      const h = this.state.drawerHouse();
      const d = this.dialog()?.nativeElement;
      if (!d) return;
      if (h && !d.open) { d.showModal(); this.motion.lock(true); }
      if (!h && d.open) { d.close(); }
    });
  }

  protected setFilter(f: Taluka | 'All'): void {
    this.generation++;
    this.state.filter.set(f);
  }

  protected setSort(e: Event): void {
    this.generation++;
    this.state.sort.set((e.target as HTMLSelectElement).value as 'featured');
  }

  protected openHouse(h: House): void {
    this.state.drawerId.set(h.id);
  }

  protected closed(): void {
    this.state.drawerId.set(null);
    this.motion.lock(false);
  }

  protected closeFromBackdrop(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.state.drawerId.set(null);
  }

  protected toCalculator(h: House): void {
    this.state.select(h.id);
    this.state.drawerId.set(null);
    setTimeout(() => this.motion.scrollTo('#calculator'), 60);
  }

  protected toVisit(e: Event): void {
    e.preventDefault();
    this.motion.scrollTo('#visit');
  }

  protected visitHref(h: House): string {
    const body = `Hello Balcão Homes,\n\nI would like to see ${h.name} in ${h.village}. Which Saturday would suit?\n\n`;
    return `mailto:${SITE.email}?subject=${encodeURIComponent(`Visit: ${h.name}, ${h.village}`)}&body=${encodeURIComponent(body)}`;
  }
}
