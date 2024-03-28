import {
  date,
  external,
  image,
  moreDetail,
  relation,
  titles,
} from './base.interface';

export interface dataDetailIF {
  mal_id: number;
  url: string;
  images: {
    jpg: image;
    webp: image;
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
  approved: boolean;
  titles: titles[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: [];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    prop: {
      from: date;
      to: date;
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: moreDetail[];
  licensors: moreDetail[];
  studios: moreDetail[];
  genres: moreDetail[];
  explicit_genres: [];
  themes: moreDetail[];
  demographics: [];
  relations: relation[];
  theme: {
    openings: string[];
    endings: string[];
  };
  external: external[];
  streaming: external[];
}

export interface detailResponse {
  data: dataDetailIF;
}
