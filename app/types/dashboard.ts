import { StaticImageData } from "next/image";

export interface PlacesSectionProps {
  title: string;
  places: {
    image: string | StaticImageData;
    title?: string;
    description?: string;
    location?: string;
  }[];
}

export interface MiStoryCardProps {
  title: string;
  description: string;
  author: string;
  duration: string;
  category: string;
  image: string | StaticImageData;
}

export interface PlaceCardProps {
  title: string;

  description: string;
  rating: number;
  reviews: number;
  category: string;
  image: string | StaticImageData;
}

export interface TourCardProps {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  category: string;
  price: number;
  duration: string;
  difficulty: string;
  image: StaticImageData;
}
