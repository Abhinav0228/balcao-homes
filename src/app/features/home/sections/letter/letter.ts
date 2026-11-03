import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PHOTOS } from '../../../../core/data/photos';
import { Reveal } from '../../../../shared/motion/reveal';
import { Parallax, ScrollWords } from '../../../../shared/motion/scroll';

/** The founder's letter, set large over a weathered roof, the thing that started it all. */
@Component({
  selector: 'app-letter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, Parallax, ScrollWords],
  template: `
    <section class="letter" aria-labelledby="letter-title">
      <div class="bg" aria-hidden="true"><img [src]="photo.src" alt="" loading="lazy" decoding="async" appParallax="10" /></div>
      <div class="wrap inner">
        <div class="card" appReveal>
          <p class="kicker" data-rise>A letter from the founder</p>
          <h2 id="letter-title" class="visually-hidden">Why I started Balcão Homes</h2>
          <blockquote>
            <p class="quote" appScrollWords>“My grandmother’s house in Aldona had eleven heirs by the time I was twenty. Nobody could sell it, nobody could mend it, and every June a little more of the roof came down.”</p>
          </blockquote>
          <div class="more" data-rise>
            <p>It took my family four years to settle the title and a year to restore the house. The masons who did the work were in their sixties, and they taught me what to ask for.</p>
            <p>I started Balcão Homes so that other houses would not wait that long. We take on six or seven a year, never more, because each one needs those same few hands.</p>
          </div>
          <footer class="sign" data-rise>
            <span class="mono" aria-hidden="true">IF</span>
            <span><b>Inês Fernandes</b><small>Founder, Balcão Homes</small></span>
            <svg class="scribble" viewBox="0 0 200 60" aria-hidden="true"><path d="M5 40 C 25 5, 40 55, 60 30 S 95 10, 105 35 S 140 50, 150 25 S 185 20, 195 32" /></svg>
          </footer>
        </div>
      </div>
      <p class="credit">{{ photo.caption }}</p>
    </section>
  `,
  styles: `
    :host { display: block; }
    .letter { position: relative; overflow: hidden; padding: calc(var(--section) * 1.1) 0; isolation: isolate; }
    .bg { position: absolute; inset: 0; z-index: -1; background: var(--bg);
      img { width: 100%; height: 100%; object-fit: cover; opacity: .55; }
      &::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(13,12,10,.92) 0%, rgba(13,12,10,.55) 60%, rgba(13,12,10,.25) 100%); } }
    .inner { display: flex; }
    .card { max-width: 860px; display: grid; gap: 28px; }
    blockquote { margin: 0; }
    .quote { font-family: var(--font-display); font-weight: 330; font-size: clamp(1.9rem, 1.1rem + 2.8vw, 3.6rem); line-height: 1.12; letter-spacing: -0.03em; }
    .more { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; color: var(--ink-2); max-width: 760px; }
    .sign { display: flex; align-items: center; gap: 16px; margin-top: 8px;
      b { display: block; font-family: var(--font-display); font-weight: 400; font-size: 1.35rem; }
      small { color: var(--muted); font-size: .85rem; font-weight: 600; } }
    .mono { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: var(--accent); color: var(--accent-ink); font-family: var(--font-display); font-size: 1.3rem; }
    .scribble { width: 150px; height: 46px; fill: none; stroke: var(--accent); stroke-width: 2.5; stroke-linecap: round; margin-left: 12px;
      path { stroke-dasharray: 320; stroke-dashoffset: 320; transition: stroke-dashoffset 2.2s var(--ease) .6s; } }
    .is-in .scribble path { stroke-dashoffset: 0; }
    .credit { position: absolute; right: var(--pad); bottom: 20px; font-size: 0.8125rem; color: var(--muted); }
    @media (max-width: 700px) { .more { grid-template-columns: 1fr; } .scribble { display: none; } }
    @media (prefers-reduced-motion: reduce) { .scribble path { stroke-dashoffset: 0; } }
  `,
})
export class Letter {
  protected readonly photo = PHOTOS.roof;
}
