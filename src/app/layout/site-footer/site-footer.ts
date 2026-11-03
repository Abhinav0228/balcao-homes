import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ALL_PHOTOS, MONSOON_CLIP } from '../../core/data/photos';
import { SITE } from '../../core/data/site';
import { Motion } from '../../shared/motion/motion';
import { Reveal } from '../../shared/motion/reveal';
import { Magnetic } from '../../shared/motion/pointer';
import { Arrow } from '../../shared/ui/arrow';

/** The close: a call to action, the links, and the name across the full width. Credits below. */
@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, Magnetic, Arrow],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  private readonly motion = inject(Motion);
  protected readonly site = SITE;
  protected readonly photos = ALL_PHOTOS;
  protected readonly clip = MONSOON_CLIP;
  protected readonly year = new Date().getFullYear();

  protected go(event: Event, href: string): void {
    event.preventDefault();
    this.motion.scrollTo(href);
  }
}
