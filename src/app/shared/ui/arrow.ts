import { ChangeDetectionStrategy, Component } from '@angular/core';

/** The arrow used inside buttons and links. */
@Component({
  selector: 'app-arrow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', style: 'display:contents' },
  template: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>`,
})
export class Arrow {}
