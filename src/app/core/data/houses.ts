import { House } from '../models';

/**
 * SAMPLE LISTINGS. Names, villages, sizes and prices are placeholders so the page can be seen at full
 * density. Replace every entry with the real houses before launch.
 */
export const HOUSES: House[] = [
  { id: 'fonseca', name: 'Casa Fonseca', village: 'Saligão', taluka: 'Bardez', built: 1894, bedrooms: 4, area: 380, plot: 1100,
    priceAsFound: 24_000_000, priceRestored: 39_000_000, restoreMonths: 9, paint: '#2456d6', bays: 5, balcao: true, featured: true,
    note: 'A deep balcão with its two lime-plaster seats intact, and a roof of the original Mangalore tiles.', status: 'available' },
  { id: 'menino', name: 'The Menino house', village: 'Loutolim', taluka: 'Salcete', built: 1872, bedrooms: 6, area: 620, plot: 2400,
    priceAsFound: 41_000_000, priceRestored: 62_000_000, restoreMonths: 12, paint: '#e8e4d6', bays: 7, balcao: true, featured: true,
    note: 'Seven bays of oyster-shell windows on the upper floor and a family chapel off the hall.', status: 'available' },
  { id: 'rua-31', name: 'No. 31, Rua de Ourém', village: 'Fontainhas, Panjim', taluka: 'Tiswadi', built: 1910, bedrooms: 3, area: 210, plot: 160,
    priceAsFound: 18_500_000, priceRestored: 27_500_000, restoreMonths: 7, paint: '#d9a42b', bays: 3, balcao: false, featured: true,
    note: 'A narrow town house on the creek side of the quarter, two minutes on foot from the chapel of St Sebastian.', status: 'available' },
  { id: 'pinto', name: 'Casa Pinto', village: 'Aldona', taluka: 'Bardez', built: 1905, bedrooms: 3, area: 240, plot: 900,
    priceAsFound: 14_500_000, priceRestored: 23_000_000, restoreMonths: 8, paint: '#b9412e', bays: 4, balcao: true,
    note: 'Faces the paddy towards the river.', status: 'available' },
  { id: 'souza', name: 'Souza mansion', village: 'Assagão', taluka: 'Bardez', built: 1880, bedrooms: 5, area: 450, plot: 1800,
    priceAsFound: 32_000_000, priceRestored: 48_000_000, restoreMonths: 11, paint: '#e8e4d6', bays: 6, balcao: true,
    note: 'A ballroom with its original timber floor.', status: 'under offer' },
  { id: 'gama', name: 'The Gama cottage', village: 'Siolim', taluka: 'Bardez', built: 1921, bedrooms: 2, area: 130, plot: 600,
    priceAsFound: 9_500_000, priceRestored: 15_500_000, restoreMonths: 6, paint: '#2456d6', bays: 3, balcao: true,
    note: 'Small, single storey, a well in the yard.', status: 'available' },
  { id: 'miranda', name: 'Casa Miranda', village: 'Chandor', taluka: 'Salcete', built: 1868, bedrooms: 7, area: 780, plot: 3200,
    priceAsFound: 52_000_000, priceRestored: 79_000_000, restoreMonths: 14, paint: '#e8e4d6', bays: 9, balcao: true,
    note: 'Nine bays wide, the largest house we have on our books.', status: 'available' },
  { id: 'colaco', name: 'Colaço house', village: 'Benaulim', taluka: 'Salcete', built: 1899, bedrooms: 4, area: 300, plot: 1300,
    priceAsFound: 21_000_000, priceRestored: 33_000_000, restoreMonths: 9, paint: '#d9a42b', bays: 5, balcao: true,
    note: 'Ten minutes on foot from the beach.', status: 'available' },
  { id: 'rodrigues', name: 'Casa Rodrigues', village: 'Margão', taluka: 'Salcete', built: 1912, bedrooms: 3, area: 220, plot: 400,
    priceAsFound: 15_000_000, priceRestored: 24_000_000, restoreMonths: 8, paint: '#b9412e', bays: 4, balcao: false,
    note: 'A town house behind the market square.', status: 'under offer' },
  { id: 'rua-natal', name: 'No. 12, Rua de Natal', village: 'Fontainhas, Panjim', taluka: 'Tiswadi', built: 1890, bedrooms: 2, area: 150, plot: 110,
    priceAsFound: 16_000_000, priceRestored: 22_500_000, restoreMonths: 6, paint: '#2456d6', bays: 3, balcao: false,
    note: 'An upper-floor flat in a heritage building, with its own stair.', status: 'available' },
  { id: 'ribandar', name: 'The Ribandar house', village: 'Ribandar', taluka: 'Tiswadi', built: 1876, bedrooms: 4, area: 340, plot: 950,
    priceAsFound: 22_000_000, priceRestored: 34_500_000, restoreMonths: 10, paint: '#e8e4d6', bays: 5, balcao: true,
    note: 'On the old causeway road, looking over the salt pans.', status: 'available' },
];

export const FEATURED_HOUSES = HOUSES.filter((h) => h.featured);
export const TALUKAS = ['Bardez', 'Salcete', 'Tiswadi'] as const;
