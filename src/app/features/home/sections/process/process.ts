import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { gsap } from 'gsap';
import { PROCESS, PROCESS_RESULT } from '../../../../core/data/process';
import { MONSOON_CLIP } from '../../../../core/data/photos';
import { Reveal } from '../../../../shared/motion/reveal';
import { SplitText } from '../../../../shared/motion/split-text';
import { Motion } from '../../../../shared/motion/motion';
import { AmbientVideo } from '../../../../shared/ui/ambient-video/ambient-video';

/**
 * From first visit to keys: a timeline whose line draws itself as the visitor scrolls, each
 * step lighting up as the line reaches it, beside the monsoon clip that explains the calendar.
 */
@Component({
  selector: 'app-process',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SplitText, AmbientVideo],
  templateUrl: './process.html',
  styleUrl: './process.scss',
})
export class Process {
  protected readonly stages = PROCESS;
  protected readonly result = PROCESS_RESULT;
  protected readonly clip = MONSOON_CLIP;

  constructor() {
    const motion = inject(Motion);
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (motion.reduced) { host.querySelectorAll('.step').forEach((s) => s.classList.add('is-lit')); return; }
      const ctx = gsap.context(() => {
        const line = host.querySelector('.line-fill');
        gsap.fromTo(line, { scaleY: 0 }, {
          scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: host.querySelector('.timeline'), start: 'top 65%', end: 'bottom 65%', scrub: 0.4 },
        });
        host.querySelectorAll<HTMLElement>('.step').forEach((s) => {
          gsap.timeline({ scrollTrigger: { trigger: s, start: 'top 65%', toggleClass: { targets: s, className: 'is-lit' } } });
        });
      });
      destroy.onDestroy(() => ctx.revert());
    });
  }
}
