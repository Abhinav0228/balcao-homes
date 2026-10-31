import { Injectable, computed, signal } from '@angular/core';
import { FEATURED_HOUSES, HOUSES } from '../../core/data/houses';
import { SITE } from '../../core/data/site';
import { Condition, House, Taluka } from '../../core/models';
import { monthlyInstalment } from '../../core/utils/emi';

/**
 * State shared by the sections of the home page: which house is in the calculator, in which
 * condition, the down payment, the listings filter and the house open in the detail drawer.
 */
@Injectable()
export class HomeState {
  readonly houses = HOUSES;
  readonly featured = FEATURED_HOUSES;

  readonly houseId = signal(FEATURED_HOUSES[0].id);
  readonly condition = signal<Condition>('restored');
  /** Share of the price paid up front, 0.2 to 0.6. */
  readonly downShare = signal(0.2);

  readonly filter = signal<Taluka | 'All'>('All');
  readonly sort = signal<'featured' | 'low' | 'high' | 'oldest'>('featured');
  readonly drawerId = signal<string | null>(null);

  readonly house = computed(() => HOUSES.find((h) => h.id === this.houseId()) ?? FEATURED_HOUSES[0]);
  readonly price = computed(() => (this.condition() === 'found' ? this.house().priceAsFound : this.house().priceRestored));
  readonly downPayment = computed(() => this.price() * this.downShare());
  readonly loan = computed(() => this.price() - this.downPayment());
  readonly monthly = computed(() => monthlyInstalment(this.loan(), SITE.loanRate, SITE.loanYears));
  readonly saving = computed(() => this.house().priceRestored - this.house().priceAsFound);

  readonly tabs = computed(() => {
    const h = this.house();
    return this.featured.some((f) => f.id === h.id) ? this.featured : [...this.featured, h];
  });

  readonly visible = computed(() => {
    const f = this.filter();
    const list = HOUSES.filter((h) => f === 'All' || h.taluka === f);
    const by: Record<string, (a: House, b: House) => number> = {
      featured: (a, b) => Number(!!b.featured) - Number(!!a.featured) || Number(a.status !== 'available') - Number(b.status !== 'available'),
      low: (a, b) => a.priceRestored - b.priceRestored,
      high: (a, b) => b.priceRestored - a.priceRestored,
      oldest: (a, b) => a.built - b.built,
    };
    return [...list].sort(by[this.sort()]);
  });

  readonly drawerHouse = computed(() => HOUSES.find((h) => h.id === this.drawerId()) ?? null);
  readonly forSale = HOUSES.filter((h) => h.status === 'available').length;

  select(id: string): void {
    this.houseId.set(id);
  }
}
