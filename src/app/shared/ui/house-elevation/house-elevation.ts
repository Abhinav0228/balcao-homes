import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Condition, House } from '../../../core/models';

interface Rect { x: number; y: number; w: number; h: number }

/**
 * A flat drawing of a house's front, made from its listing: the number of window bays, its paint,
 * and whether it has a balcão. Shown "as found" (faded wash, bare laterite, broken tiles) or
 * "restored". It stands in for photography until the client supplies photographs of each house.
 */
@Component({
  selector: 'app-house-elevation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './house-elevation.html',
  styleUrl: './house-elevation.scss',
  host: { '[class.is-found]': "condition() === 'found'" },
})
export class HouseElevation {
  readonly house = input.required<House>();
  readonly condition = input<Condition>('restored');

  protected readonly size = 400;
  private readonly left = 34;
  private readonly right = 366;
  private readonly wallTop = 150;
  private readonly wallBottom = 318;

  protected readonly wall = computed<Rect>(() => ({
    x: this.left, y: this.wallTop, w: this.right - this.left, h: this.wallBottom - this.wallTop,
  }));

  /** Hip roof: wider than the wall at the eaves, narrowing to the ridge. */
  protected readonly roof = computed(() => {
    const eave = this.wallTop + 2;
    return `${this.left - 18},${eave} ${this.right + 18},${eave} ${this.right - 58},${this.wallTop - 64} ${this.left + 58},${this.wallTop - 64}`;
  });

  /** Courses of tiles: short dark bars on the roof, a few missing when the house is as found. */
  protected readonly tiles = computed(() => {
    const out: (Rect & { gone: boolean })[] = [];
    for (let row = 0; row < 5; row++) {
      const y = this.wallTop - 56 + row * 12;
      const inset = 58 - row * 14;
      for (let x = this.left + inset; x < this.right - inset - 10; x += 16) {
        const gone = (row * 7 + Math.round(x)) % 11 === 0 || (row === 2 && x % 5 === 0);
        out.push({ x, y, w: 10, h: 6, gone });
      }
    }
    return out;
  });

  protected readonly windows = computed(() => {
    const h = this.house();
    const bays = Math.max(3, Math.min(9, h.bays));
    const span = this.right - this.left;
    const bayW = span / bays;
    const centre = Math.floor(bays / 2);
    return Array.from({ length: bays }, (_, i) => {
      const w = Math.min(30, bayW * 0.56);
      const x = this.left + bayW * i + (bayW - w) / 2;
      const isDoor = h.balcao ? false : i === centre;
      const y = isDoor ? this.wallTop + 40 : this.wallTop + 34;
      const height = isDoor ? this.wallBottom - y : 82;
      return { x, y, w, h: height, isDoor, panes: this.panes(x, y, w, height) };
    });
  });

  /** The balcão: a raised porch in front of the centre bay, with two seats and two pillars. */
  protected readonly balcao = computed(() => {
    if (!this.house().balcao) return null;
    const cx = (this.left + this.right) / 2;
    const w = 128;
    const x = cx - w / 2;
    return {
      roof: { x: x - 8, y: this.wallTop + 18, w: w + 16, h: 12 },
      pillars: [
        { x: x + 2, y: this.wallTop + 30, w: 12, h: 104 },
        { x: x + w - 14, y: this.wallTop + 30, w: 12, h: 104 },
      ],
      seats: [
        { x: x - 6, y: this.wallBottom - 30, w: 40, h: 14 },
        { x: x + w - 34, y: this.wallBottom - 30, w: 40, h: 14 },
      ],
      plinth: { x: x - 10, y: this.wallBottom - 16, w: w + 20, h: 16 },
      steps: [
        { x: cx - 26, y: this.wallBottom, w: 52, h: 8 },
        { x: cx - 34, y: this.wallBottom + 8, w: 68, h: 8 },
      ],
      door: { x: cx - 18, y: this.wallTop + 48, w: 36, h: this.wallBottom - this.wallTop - 64 },
    };
  });

  /** Bare laterite where the lime has fallen away, only on a house as found. */
  protected readonly patches: Rect[] = [
    { x: 46, y: 270, w: 44, h: 30 }, { x: 300, y: 164, w: 38, h: 22 }, { x: 232, y: 286, w: 30, h: 22 },
  ];

  /** Oyster-shell panes: a grid of small squares inside the window frame. */
  private panes(x: number, y: number, w: number, h: number): Rect[] {
    const out: Rect[] = [];
    const pad = 4;
    const gap = 2;
    const cols = 3;
    const pw = (w - pad * 2 - gap * (cols - 1)) / cols;
    const rows = Math.max(3, Math.floor((h - pad * 2 + gap) / (pw + gap)));
    const ph = (h - pad * 2 - gap * (rows - 1)) / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) out.push({ x: x + pad + c * (pw + gap), y: y + pad + r * (ph + gap), w: pw, h: ph });
    }
    return out;
  }
}
