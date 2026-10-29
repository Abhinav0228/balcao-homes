/** A house Balcão Homes has on its books. Sample data until the client confirms the real listings. */
export type Taluka = 'Bardez' | 'Salcete' | 'Tiswadi';

export interface House {
  id: string;
  name: string;
  village: string;
  taluka: Taluka;
  /** Year the house was built (approximate, from the title deeds). */
  built: number;
  bedrooms: number;
  /** Built-up area in square metres. */
  area: number;
  /** Plot in square metres. */
  plot: number;
  /** Price in rupees if bought as found, before restoration. */
  priceAsFound: number;
  /** Price in rupees once our restoration is complete. */
  priceRestored: number;
  /** Months from signing to keys when bought restored. */
  restoreMonths: number;
  /** Lime-wash colour of the front, used for the house's dot and drawing. */
  paint: string;
  /** One sentence on what makes this house itself. */
  note: string;
  /** Elevation drawing proportions: number of window bays and whether it has a balcão. */
  bays: number;
  balcao: boolean;
  featured?: boolean;
  status: 'available' | 'under offer';
}

export type Condition = 'found' | 'restored';
