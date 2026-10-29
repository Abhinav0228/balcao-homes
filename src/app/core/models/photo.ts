/** A found photograph of Goa. Never presented as one of the houses for sale. */
export interface Photo {
  src: string;
  /** Intrinsic size of the file, to reserve space and avoid layout shift. */
  width: number;
  height: number;
  alt: string;
  /** What the picture is, shown as a caption. */
  caption: string;
  credit: { title: string; author: string; licence: string; source: string };
}
