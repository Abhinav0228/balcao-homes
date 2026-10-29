import { Photo } from '../models';

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

/**
 * Photographs of Goa from Wikimedia Commons, saved in public/photos and credited in the footer.
 * They show the streets, houses and countryside our houses belong to. None of them is a house we sell.
 */
export const PHOTOS = {
  braganza: {
    src: 'photos/in-goa-chandor-braganza-haus.jpg', width: 1920, height: 1272,
    alt: 'The white front of the Braganza house in Chandor, with arched windows and red iron balconies above a garden',
    caption: 'Braganza house, Chandor',
    credit: { title: 'IN-Goa-Chandor-braganza-haus', author: 'Balou46', licence: 'CC BY-SA 4.0', source: commons('IN-Goa-Chandor-braganza-haus.jpg') },
  },
  ballroom: {
    src: 'photos/in-goa-chandor-braganza-saal.jpg', width: 1920, height: 1272,
    alt: 'A long ballroom with crystal chandeliers, a painted timber ceiling and blue velvet chairs',
    caption: 'The ballroom, Braganza house, Chandor',
    credit: { title: 'IN-Goa-Chandor-braganza-saal', author: 'Balou46', licence: 'CC BY-SA 4.0', source: commons('IN-Goa-Chandor-braganza-saal.jpg') },
  },
  natal: {
    src: 'photos/rua-de-natal.jpg', width: 1280, height: 1707,
    alt: 'A yellow two-storey town house with a pillared balcão and shuttered windows on Rua de Natal, Panjim',
    caption: 'No. 470, Rua de Natal, Fontainhas',
    credit: { title: '470, Rua de Natal', author: 'urbzoo', licence: 'CC BY 2.0', source: commons('470,_Rua_de_Natal_-_19th-20th_century_(4276244664).jpg') },
  },
  blueHouse: {
    src: 'photos/portuguese-colonial-architecture-panaji-goa-india-01.jpg', width: 1920, height: 1440,
    alt: 'A deep blue house with a clay-tile roof, white window hoods and laterite gate posts under a coconut palm',
    caption: 'A lime-washed house in Panjim',
    credit: { title: 'Portuguese Colonial Architecture - Panaji - Goa - India - 01', author: 'Adam Jones', licence: 'CC BY-SA 3.0', source: commons('Portuguese_Colonial_Architecture_-_Panaji_-_Goa_-_India_-_01.JPG') },
  },
  chandorHall: {
    src: 'photos/chandor-mansion.jpg', width: 1280, height: 1707,
    alt: 'Inside a Chandor mansion: a long hall with a teak ceiling, a crystal chandelier and a cane planter’s chair',
    caption: 'A family mansion in Chandor, now a private museum',
    credit: { title: 'Old Portuguese Mansion, Chandor, Goa', author: 'J P Dutt', licence: 'CC BY-SA 4.0', source: commons('Old_Portugese_Mansion,_Chandor,_Goa.jpg') },
  },
  window: {
    src: 'photos/fontainhas-window.jpg', width: 1280, height: 1707,
    alt: 'A tall painted window of an old Goan home in Fontainhas, framed in white lime plaster',
    caption: 'A window in Fontainhas, Panjim',
    credit: { title: 'Window of a Goan home in Fontainhas', author: 'Frederick Noronha', licence: 'CC BY-SA 4.0', source: commons('Window_of_a_Goan_home_in_Fontainhas,_the_Latin_Quarter_of_Panjim,_Goa,_India.jpg') },
  },
  lane: {
    src: 'photos/fontainhas-lane.jpg', width: 1280, height: 853,
    alt: 'A narrow lane in Fontainhas lined with yellow, blue and red painted houses',
    caption: 'A lane in Fontainhas',
    credit: { title: 'Road along Vasco-da-gama residence in Fontainhas, Panaji', author: 'iMahesh', licence: 'CC BY-SA 4.0', source: commons('Road_along_Vasco-da-gama_residence_in_Fontainhas,_Panaji.jpg') },
  },
  laterite: {
    src: 'photos/saligao-laterite.jpg', width: 1280, height: 1927,
    alt: 'Bare red laterite blocks of an old building in Saligão, the stone most Goan houses are built from',
    caption: 'Laterite under the lime, Saligão',
    credit: { title: 'Laterite-built building at Saligao in Bardez', author: 'Frederick Noronha', licence: 'CC BY-SA 4.0', source: commons('Goa,_India_--_Laterite-built_building_at_Saligao_in_Bardez._2.jpg') },
  },
  azulejo: {
    src: 'photos/azulejo.jpg', width: 1280, height: 1707,
    alt: 'Blue and white azulejo tiles painted with a figure, set into the wall of a Goan home',
    caption: 'Azulejo tiles in a Goan home',
    credit: { title: 'Azulejo painting in a Goan home', author: 'Frederick Noronha', licence: 'CC BY-SA 4.0', source: commons('Azuleijo_painting_in_a_Goan_home,_India_3.jpg') },
  },
  inn: {
    src: 'photos/panjim-inn.jpg', width: 1280, height: 1707,
    alt: 'The red and white front of the Panjim Inn, an old mansion in Fontainhas, with its long upper verandah',
    caption: 'Panjim Inn, an old family house in Fontainhas',
    credit: { title: 'Panjim Inn Fontainhas Goa', author: 'John Paul Jose', licence: 'CC BY-SA 4.0', source: commons('Panjim_Inn_Fontainhas_Goa.jpg') },
  },
  roof: {
    src: 'photos/indo-portuguese-style-house-in-ponda-city.jpg', width: 1920, height: 2560,
    alt: 'A weathered clay-tile roof and a cracked lime-washed wall streaked by the monsoon',
    caption: 'Tiles and lime after many monsoons, Ponda',
    credit: { title: 'Indo-Portuguese style house in Ponda City', author: 'Zenoweed', licence: 'CC BY-SA 4.0', source: commons('Indo-Portuguese_style_house_in_Ponda_City.jpeg') },
  },
  paddy: {
    src: 'photos/paddy-fields-of-south-goa.jpg', width: 1920, height: 1280,
    alt: 'Bright green paddy fields edged by coconut palms under monsoon clouds in South Goa',
    caption: 'Paddy fields, South Goa',
    credit: { title: 'Paddy Fields of South Goa', author: 'iMahesh', licence: 'CC BY-SA 4.0', source: commons('Paddy_Fields_of_South_Goa.jpg') },
  },
  church: {
    src: 'photos/saligao-church-403511.jpg', width: 1920, height: 1440,
    alt: 'The white Gothic-revival church of Saligão against the evening sky',
    caption: 'Mãe de Deus church, Saligão',
    credit: { title: 'Saligao church 403511', author: 'Frederick Noronha', licence: 'CC BY-SA 4.0', source: commons('Saligao_church_403511.jpg') },
  },
  palms: {
    src: 'photos/vagator-goa-india-coconut-palm-trees.jpg', width: 1920, height: 1280,
    alt: 'Coconut palms against the sky at Vagator, North Goa',
    caption: 'Coconut palms, Vagator',
    credit: { title: 'Vagator, Goa, India, Coconut palm trees', author: 'Vyacheslav Argenberg', licence: 'CC BY 4.0', source: commons('Vagator,_Goa,_India,_Coconut_palm_trees.jpg') },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;
export const ALL_PHOTOS: Photo[] = Object.values(PHOTOS);

const RAIN = 'Rain_in_Baga_beach%2C_Goa_%28Timelapse%29_1080p.webm';

/** The one moving picture: the monsoon arriving over Baga beach. */
export const MONSOON_CLIP = {
  poster: `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/${RAIN}/960px--${RAIN}.jpg`,
  sources: [
    { src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/f/fc/${RAIN}/${RAIN}.480p.vp9.webm`, type: 'video/webm' },
    { src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/f/fc/${RAIN}/${RAIN}.360p.mpeg4.mov`, type: 'video/mp4' },
  ],
  width: 854,
  height: 480,
  label: 'Time-lapse of monsoon rain sweeping over Baga beach, Goa',
  credit: { title: 'Rain in Baga beach, Goa (Timelapse)', author: 'Subhashish Panigrahi', licence: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Rain_in_Baga_beach,_Goa_(Timelapse)_1080p.webm' },
};
