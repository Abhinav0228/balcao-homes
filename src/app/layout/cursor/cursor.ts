import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { Motion } from '../../shared/motion/motion';

/**
 * A custom cursor for mouse users: a dot that follows exactly and a ring that eases behind it.
 * The ring grows over links and buttons, and shows a word ("View", "Drag") over elements that
 * carry data-cursor. Hidden on touch screens and under reduced motion.
 */
@Component({
  selector: 'app-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[class.is-on]': 'on()', '[class.is-hover]': 'hover()', '[class.is-label]': '!!label()', '[class.is-down]': 'down()' },
  template: `
    <div class="ring" #ring><span>{{ label() }}</span></div>
    <div class="dot" #dot></div>
  `,
  styles: `
    :host { position: fixed; inset: 0; z-index: 150; pointer-events: none; display: none; }
    :host(.is-on) { display: block; }
    .dot, .ring { position: absolute; left: 0; top: 0; border-radius: 50%; will-change: transform; }
    .dot { width: 6px; height: 6px; margin: -3px 0 0 -3px; background: var(--accent); }
    .ring {
      width: 40px; height: 40px; margin: -20px 0 0 -20px;
      display: grid; place-items: center;
      box-shadow: inset 0 0 0 1px rgba(242, 236, 224, 0.45);
      mix-blend-mode: difference;
      transition: width .45s var(--ease), height .45s var(--ease), margin .45s var(--ease), background-color .45s var(--ease), box-shadow .45s var(--ease);
      span { font-size: 12px; font-weight: 700; color: var(--accent-ink); opacity: 0; transition: opacity .3s; letter-spacing: .02em; }
    }
    :host(.is-hover) .ring { width: 64px; height: 64px; margin: -32px 0 0 -32px; background: rgba(242, 236, 224, 0.9); box-shadow: none; }
    :host(.is-label) .ring { width: 92px; height: 92px; margin: -46px 0 0 -46px; background: var(--accent); box-shadow: none; mix-blend-mode: normal; span { opacity: 1; } }
    :host(.is-hover) .dot, :host(.is-label) .dot { opacity: 0; }
    :host(.is-down) .ring { width: 30px; height: 30px; margin: -15px 0 0 -15px; }
  `,
})
export class Cursor {
  protected readonly on = signal(false);
  protected readonly hover = signal(false);
  protected readonly label = signal('');
  protected readonly down = signal(false);

  constructor() {
    const motion = inject(Motion);
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (!motion.fine || motion.reduced) return;
      const ring = host.querySelector<HTMLElement>('.ring')!;
      const dot = host.querySelector<HTMLElement>('.dot')!;
      let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf = 0;
      const move = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px)`;
        if (!this.on()) { this.on.set(true); rx = mx; ry = my; }
      };
      const loop = () => {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        raf = requestAnimationFrame(loop);
      };
      const over = (e: Event) => {
        const t = e.target as HTMLElement;
        const labelled = t.closest<HTMLElement>('[data-cursor]');
        this.label.set(labelled?.dataset['cursor'] ?? '');
        this.hover.set(!labelled && !!t.closest('a, button, [role="tab"], label, input, select, textarea, summary'));
      };
      const leave = () => this.on.set(false);
      const pd = () => this.down.set(true);
      const pu = () => this.down.set(false);
      addEventListener('pointermove', move, { passive: true });
      document.addEventListener('pointerover', over);
      document.documentElement.addEventListener('pointerleave', leave);
      addEventListener('pointerdown', pd);
      addEventListener('pointerup', pu);
      document.documentElement.classList.add('has-cursor');
      loop();
      destroy.onDestroy(() => {
        cancelAnimationFrame(raf);
        removeEventListener('pointermove', move);
        document.removeEventListener('pointerover', over);
        document.documentElement.removeEventListener('pointerleave', leave);
        removeEventListener('pointerdown', pd);
        removeEventListener('pointerup', pu);
      });
    });
  }
}
