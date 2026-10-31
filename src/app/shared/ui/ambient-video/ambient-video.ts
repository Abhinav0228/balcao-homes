import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, PLATFORM_ID, inject, input, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface VideoSource { src: string; type: string }

/**
 * A muted, looping clip with a poster frame. It plays only while on screen, and never under
 * reduced motion, where the poster stands still instead.
 */
@Component({
  selector: 'app-ambient-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <video #video [poster]="poster()" [attr.width]="width()" [attr.height]="height()"
           muted loop playsinline preload="none" [attr.aria-label]="label()">
      @for (s of sources(); track s.src) { <source [src]="s.src" [type]="s.type" /> }
    </video>
  `,
  styles: `
    :host { display: block; background: var(--surface); }
    video { display: block; width: 100%; height: auto; }
  `,
})
export class AmbientVideo implements AfterViewInit {
  readonly sources = input.required<VideoSource[]>();
  readonly poster = input.required<string>();
  readonly width = input.required<number>();
  readonly height = input.required<number>();
  readonly label = input.required<string>();

  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    if (!this.browser || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const v = this.video().nativeElement;
    v.muted = true;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => undefined);
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    this.destroyRef.onDestroy(() => io.disconnect());
  }
}
