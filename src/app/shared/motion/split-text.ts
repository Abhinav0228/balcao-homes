import { DestroyRef, Directive, ElementRef, afterNextRender, effect, inject, input } from '@angular/core';
import { Motion } from './motion';

/**
 * Splits a heading into words, each inside its own mask, so the words can rise one after
 * another. Plays when scrolled into view, or when `splitWhen` turns true if it is bound.
 * Elements keep their child markup (for example an italic <span class="it">): text nodes are split,
 * elements are wrapped whole.
 */
@Directive({ selector: '[appSplit]' })
export class SplitText {
  readonly splitWhen = input<boolean | undefined>(undefined);
  readonly splitDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly motion = inject(Motion);
  private done = false;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (this.motion.reduced) return;
      this.split();
      this.el.style.setProperty('--split-delay', `${this.splitDelay()}ms`);
      if (this.splitWhen() !== undefined) return;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { this.play(); io.disconnect(); }
      }, { rootMargin: '0px 0px -10% 0px' });
      io.observe(this.el);
      destroy.onDestroy(() => io.disconnect());
    });
    effect(() => { if (this.splitWhen()) queueMicrotask(() => this.play()); });
  }

  private play(): void {
    if (this.done) return;
    this.done = true;
    this.el.classList.add('is-split-in');
  }

  private split(): void {
    if (this.el.dataset['split']) return;
    this.el.dataset['split'] = '1';
    const label = this.el.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    if (!this.el.getAttribute('aria-label')) this.el.setAttribute('aria-label', label);
    let i = 0;
    const wrap = (node: Node): Node[] => {
      const word = document.createElement('span');
      word.className = 'split-word';
      word.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.style.setProperty('--w', String(i++));
      inner.appendChild(node);
      word.appendChild(inner);
      return [word];
    };
    const walk = (parent: Node) => {
      for (const node of Array.from(parent.childNodes)) {
        if (node.nodeType === Node.TEXT_NODE) {
          const parts = (node.textContent ?? '').split(/(\s+)/);
          const frag = document.createDocumentFragment();
          for (const p of parts) {
            if (!p) continue;
            if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(' '));
            else wrap(document.createTextNode(p)).forEach((n) => frag.appendChild(n));
          }
          parent.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'BR') {
          continue;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Split inside styled spans so each of their words also rises on its own.
          const elNode = node as HTMLElement;
          const words = (elNode.textContent ?? '').trim().split(/\s+/);
          if (words.length > 1) {
            const frag = document.createDocumentFragment();
            words.forEach((w, wi) => {
              const clone = elNode.cloneNode(false) as HTMLElement;
              clone.textContent = w;
              wrap(clone).forEach((n) => frag.appendChild(n));
              if (wi < words.length - 1) frag.appendChild(document.createTextNode(' '));
            });
            parent.replaceChild(frag, node);
          } else {
            const placeholder = document.createComment('');
            parent.replaceChild(placeholder, node);
            wrap(node).forEach((n) => parent.replaceChild(n, placeholder));
          }
        }
      }
    };
    walk(this.el);
  }
}
