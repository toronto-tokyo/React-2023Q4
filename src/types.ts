export interface BeerData {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
  volume: BeerVolume;
}

interface BeerVolume {
  value: number;
  unit: string;
}
