import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Motion } from '../../shared/motion/motion';
import { SiteNav } from '../../layout/site-nav/site-nav';
import { SiteFooter } from '../../layout/site-footer/site-footer';
import { Preloader } from '../../layout/preloader/preloader';
import { Cursor } from '../../layout/cursor/cursor';
import { HomeState } from './home-state';
import { Hero } from './sections/hero/hero';
import { Marquee } from './sections/marquee/marquee';
import { Intro } from './sections/intro/intro';
import { Showcase } from './sections/showcase/showcase';
import { Listings } from './sections/listings/listings';
import { Process } from './sections/process/process';
import { Gallery } from './sections/gallery/gallery';
import { Letter } from './sections/letter/letter';
import { Faq } from './sections/faq/faq';
import { Contact } from './sections/contact/contact';

/** The landing page, top to bottom. Starts smooth scrolling once it has rendered. */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeState],
  imports: [SiteNav, SiteFooter, Preloader, Cursor, Hero, Marquee, Intro, Showcase, Listings, Process, Gallery, Letter, Faq, Contact],
  template: `
    <app-preloader />
    <app-cursor />
    <app-site-nav />
    <main id="main">
      <app-hero />
      <app-marquee />
      <app-intro />
      <app-showcase />
      <app-listings />
      <app-process />
      <app-gallery />
      <app-letter />
      <app-faq />
      <app-contact />
    </main>
    <app-site-footer />
    <div class="grain" aria-hidden="true"></div>
  `,
})
export class Home {
  constructor() {
    const motion = inject(Motion);
    afterNextRender(() => {
      motion.start();
      // Fonts and lazy images change heights; re-measure the scroll scenes once they settle.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    });
    inject(DestroyRef).onDestroy(() => motion.stop());
  }
}
