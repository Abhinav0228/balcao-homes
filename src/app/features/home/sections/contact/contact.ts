import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SITE } from '../../../../core/data/site';
import { PHOTOS } from '../../../../core/data/photos';
import { HomeState } from '../../home-state';
import { Reveal } from '../../../../shared/motion/reveal';
import { SplitText } from '../../../../shared/motion/split-text';
import { Magnetic } from '../../../../shared/motion/pointer';
import { Parallax } from '../../../../shared/motion/scroll';
import { Arrow } from '../../../../shared/ui/arrow';

/**
 * Book a Saturday visit. The form has no backend: sending it opens the visitor's email with
 * everything they chose already written in.
 */
@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, SplitText, Magnetic, Parallax, Arrow],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly site = SITE;
  protected readonly photo = PHOTOS.blueHouse;
  protected readonly state = inject(HomeState);
  protected readonly budgets = ['Under ₹2 crore', '₹2–3 crore', '₹3–5 crore', 'Over ₹5 crore'];
  protected readonly budget = signal(this.budgets[1]);
  protected readonly sent = signal(false);

  protected readonly name = signal('');
  protected readonly houseId = signal('any');
  protected readonly message = signal('');

  protected readonly mailto = computed(() => {
    const house = this.state.houses.find((h) => h.id === this.houseId());
    const lines = [
      'Hello Balcão Homes,',
      '',
      house ? `I would like to see ${house.name} in ${house.village}.` : 'I would like to see some of your houses.',
      `My budget is ${this.budget()}.`,
      this.message() ? `\n${this.message()}` : '',
      '',
      'Which Saturday would suit?',
      '',
      this.name() || '',
    ];
    const subject = house ? `Saturday visit: ${house.name}` : 'Saturday visit';
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  });

  protected val(e: Event): string {
    return (e.target as HTMLInputElement).value;
  }

  protected send(e: Event): void {
    e.preventDefault();
    window.location.href = this.mailto();
    this.sent.set(true);
  }
}
