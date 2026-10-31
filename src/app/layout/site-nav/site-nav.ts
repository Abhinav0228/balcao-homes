import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { Motion } from '../../shared/motion/motion';
import { Magnetic } from '../../shared/motion/pointer';
import { Arrow } from '../../shared/ui/arrow';

/**
 * Fixed top bar: wordmark, five links and the one action. Transparent over the hero, solid once
 * the page scrolls, tucked away while scrolling down and back on the way up. On phones the links
 * open as a full-screen menu.
 */
@Component({
  selector: 'app-site-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Magnetic, Arrow],
  host: { '[class.is-solid]': 'solid()', '[class.is-hidden]': 'hidden() && !open()', '[class.is-open]': 'open()', '[class.is-ready]': 'motion.ready()' },
  templateUrl: './site-nav.html',
  styleUrl: './site-nav.scss',
})
export class SiteNav {
  protected readonly motion = inject(Motion);
  protected readonly solid = signal(false);
  protected readonly hidden = signal(false);
  protected readonly open = signal(false);
  protected readonly links = [
    { href: '#houses', label: 'Houses' },
    { href: '#calculator', label: 'Two prices' },
    { href: '#process', label: 'How it works' },
    { href: '#goa', label: 'Goa' },
    { href: '#questions', label: 'Questions' },
  ];

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      let last = scrollY;
      const onScroll = () => {
        const y = scrollY;
        this.solid.set(y > 40);
        if (Math.abs(y - last) > 6) { this.hidden.set(y > last && y > innerHeight * 0.6); last = y; }
      };
      addEventListener('scroll', onScroll, { passive: true });
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && this.open()) this.toggle(false); };
      addEventListener('keydown', onKey);
      destroy.onDestroy(() => { removeEventListener('scroll', onScroll); removeEventListener('keydown', onKey); });
    });
  }

  protected toggle(force?: boolean): void {
    const next = force ?? !this.open();
    this.open.set(next);
    this.motion.lock(next);
  }

  protected go(event: Event, href: string): void {
    event.preventDefault();
    if (this.open()) this.toggle(false);
    this.motion.scrollTo(href);
    history.replaceState(null, '', href);
  }
}
