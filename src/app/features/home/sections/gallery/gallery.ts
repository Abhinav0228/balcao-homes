import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { gsap } from 'gsap';
import { PHOTOS } from '../../../../core/data/photos';
import { Motion } from '../../../../shared/motion/motion';
import { SplitText } from '../../../../shared/motion/split-text';

/**
 * "The Goa you would live in": on desktop the section pins and the photographs travel sideways
 * as the visitor scrolls down, each one drifting inside its frame. On phones it is a row to swipe.
 */
@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SplitText],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  protected readonly items = [
    { photo: PHOTOS.ballroom, size: 'wide' },
    { photo: PHOTOS.window, size: 'tall' },
    { photo: PHOTOS.lane, size: 'wide' },
    { photo: PHOTOS.azulejo, size: 'tall' },
    { photo: PHOTOS.paddy, size: 'wide' },
    { photo: PHOTOS.inn, size: 'tall' },
    { photo: PHOTOS.church, size: 'wide' },
    { photo: PHOTOS.palms, size: 'wide' },
  ];

  constructor() {
    const motion = inject(Motion);
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (motion.reduced) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const track = host.querySelector<HTMLElement>('.track')!;
        const pin = host.querySelector<HTMLElement>('.pin')!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
        });
        host.querySelectorAll<HTMLElement>('.shot img').forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        });
        gsap.to(host.querySelector('.progress i'), { scaleX: 1, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: true } });
      });
      destroy.onDestroy(() => mm.revert());
    });
  }
}
