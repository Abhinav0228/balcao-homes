import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PHOTOS } from '../../../../core/data/photos';
import { HOUSES } from '../../../../core/data/houses';
import { Reveal } from '../../../../shared/motion/reveal';
import { SplitText } from '../../../../shared/motion/split-text';
import { CountUp, Parallax, ScrollWords } from '../../../../shared/motion/scroll';
import { Motion } from '../../../../shared/motion/motion';

/**
 * What these houses are made of and why we restore them: a statement that lights up word by
 * word, a collage of three photographs, the four materials as panels that open on hover, and the
 * numbers that describe the business.
 */
@Component({
  selector: 'app-intro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SplitText, ScrollWords, Parallax, CountUp],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
})
export class Intro {
  protected readonly motion = inject(Motion);
  protected readonly photos = PHOTOS;
  protected readonly open = signal(0);
  protected readonly oldest = Math.min(...HOUSES.map((h) => h.built));
  protected readonly count = HOUSES.length;

  protected readonly materials = [
    { name: 'Laterite', line: 'Red stone cut from the hill behind the house. We repair it block by block, never with cement.', photo: PHOTOS.laterite },
    { name: 'Lime', line: 'Burnt from shells and laid on in coats, so the walls can breathe through the monsoon.', photo: PHOTOS.braganza },
    { name: 'Oyster shell', line: 'Flattened shell panes that soften the light and keep out the heat, mended pane by pane.', photo: PHOTOS.window },
    { name: 'Teak & tile', line: 'The roof re-laid on new timber with the old Mangalore tiles put back in their courses.', photo: PHOTOS.roof },
  ];
}
