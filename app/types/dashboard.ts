

export interface PlacesSectionProps {
  title: string;
  places: {
    image: string;
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
  image: string;
}

export interface PlaceCardProps {
  title: string;
  location: string;
  description: string;
  rating: number;
  reviews: number;
  category: string;
  image: string;
}


export interface TourCardProps {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  image: string;
}