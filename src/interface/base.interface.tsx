export interface moreDetail {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface titles {
  type: string;
  title: string;
}

export interface date {
  day: number;
  month: number;
  year: number;
}

export interface relation {
  relation: string;
  entry: moreDetail[];
}

export interface external {
  name: string;
  url: string;
}

export interface image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}
