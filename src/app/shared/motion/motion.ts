import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/**
 * The page's motion engine: smooth scrolling (Lenis) wired into GSAP's ScrollTrigger, plus the
 * flags every effect checks first (reduced motion, fine pointer) and the "intro finished" signal
 * the hero waits for.
 */
@Injectable({ providedIn: 'root' })
export class Motion {
  readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly reduced = this.browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  readonly fine = this.browser && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  /** True once the preloader has lifted. */
  readonly ready = signal(false);

  private lenis?: Lenis;

  constructor() {
    if (!this.browser) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!this.reduced) document.documentElement.classList.add('js-motion');
  }

  /** Starts smooth scrolling. Called once by the page. */
  start(): void {
    if (!this.browser || this.reduced || this.lenis) return;
    this.lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 1 });
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => this.lenis?.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  stop(): void {
    this.lenis?.destroy();
    this.lenis = undefined;
  }

  lock(on: boolean): void {
    if (on) this.lenis?.stop(); else this.lenis?.start();
    document.body.classList.toggle('is-locked', on);
  }

  scrollTo(target: string | HTMLElement | number): void {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (el == null) return;
    if (this.lenis) this.lenis.scrollTo(el as HTMLElement | number, { offset: 0, duration: 1.4 });
    else if (typeof el === 'number') window.scrollTo({ top: el, behavior: this.reduced ? 'auto' : 'smooth' });
    else el.scrollIntoView({ behavior: this.reduced ? 'auto' : 'smooth', block: 'start' });
  }
}
