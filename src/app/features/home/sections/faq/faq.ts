import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FAQ } from '../../../../core/data/faq';
import { SITE } from '../../../../core/data/site';
import { Reveal } from '../../../../shared/motion/reveal';
import { SplitText } from '../../../../shared/motion/split-text';
import { Arrow } from '../../../../shared/ui/arrow';

/** The questions buyers ask, as an accordion, beside a card that hands the rest to a person. */
@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SplitText, Arrow],
  template: `
    <section class="faq cream" id="questions" aria-labelledby="faq-title">
      <div class="wrap grid">
        <div class="side" appReveal>
          <p class="kicker" data-rise>Questions</p>
          <h2 id="faq-title" class="section-title" appSplit>What buyers <span class="it">ask us</span></h2>
          <div class="ask" data-rise>
            <p>Something else on your mind? Ask the person who will show you round.</p>
            <a class="btn dark" [href]="site.whatsapp" target="_blank" rel="noopener">Message us on WhatsApp <span class="arrow"><app-arrow /></span></a>
          </div>
        </div>
        <div class="list" appReveal="60">
          @for (item of items; track item.q; let i = $index) {
            <div class="item" [class.is-open]="open() === i" data-rise>
              <h3>
                <button type="button" [id]="'q' + i" [attr.aria-expanded]="open() === i" [attr.aria-controls]="'a' + i" (click)="toggle(i)">
                  <span class="n num">{{ (i + 1).toString().padStart(2, '0') }}</span>
                  <span class="q">{{ item.q }}</span>
                  <span class="plus" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="a" [id]="'a' + i" role="region" [attr.aria-labelledby]="'q' + i">
                <div><p>{{ item.a }}</p></div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .faq { background: var(--cream); color: var(--cream-ink); padding: var(--section) 0; }
    .grid { display: grid; grid-template-columns: 1fr 1.35fr; gap: clamp(40px, 7vw, 120px); align-items: start; }
    .side { position: sticky; top: 110px; display: grid; gap: 22px; }
    .section-title { max-width: 9ch; }
    .ask { margin-top: 18px; padding: 24px; border-radius: var(--radius); background: var(--cream-2); display: grid; gap: 18px; justify-items: start;
      p { font-size: var(--step-lead); line-height: 1.45; } }
    .item { border-bottom: 1px solid var(--cream-line); }
    h3 { font-family: var(--font-text); font-size: inherit; letter-spacing: 0; line-height: inherit; font-weight: inherit; }
    button { width: 100%; display: grid; grid-template-columns: 44px 1fr 40px; gap: 12px; align-items: center; text-align: left; padding: 26px 0; border: 0; background: none; color: inherit; }
    .n { font-size: .82rem; font-weight: 700; color: var(--laterite); }
    .q { font-family: var(--font-display); font-size: clamp(1.25rem, 1rem + .9vw, 1.75rem); font-weight: 380; letter-spacing: -0.02em; line-height: 1.2; transition: transform 500ms var(--ease); }
    button:hover .q { transform: translateX(6px); }
    .plus { position: relative; width: 40px; height: 40px; border-radius: 50%; background: var(--cream-2); transition: background-color 500ms var(--ease), transform 600ms var(--ease);
      &::before, &::after { content: ''; position: absolute; left: 13px; right: 13px; top: 19px; height: 2px; background: var(--cream-ink); transition: transform 600ms var(--ease), background-color 400ms; }
      &::after { transform: rotate(90deg); } }
    .is-open .plus { background: var(--cream-ink); transform: rotate(180deg); &::before, &::after { background: var(--cream); } &::after { transform: rotate(0); } }
    .a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 600ms var(--ease);
      > div { overflow: hidden; }
      p { padding: 0 52px 28px 56px; font-size: 1.05rem; line-height: 1.65; color: var(--cream-muted); opacity: 0; transform: translateY(-8px); transition: opacity 500ms var(--ease), transform 600ms var(--ease); } }
    .is-open .a { grid-template-rows: 1fr; p { opacity: 1; transform: none; } }
    @media (max-width: 960px) { .grid { grid-template-columns: 1fr; } .side { position: static; } }
    @media (max-width: 520px) { button { grid-template-columns: 1fr 40px; } .n { display: none; } .a p { padding: 0 0 24px; } }
  `,
})
export class Faq {
  protected readonly items = FAQ;
  protected readonly site = SITE;
  protected readonly open = signal<number | null>(0);

  protected toggle(i: number): void {
    this.open.update((o) => (o === i ? null : i));
  }
}
