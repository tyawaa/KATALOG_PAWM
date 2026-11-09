import type { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: ImageSourcePropType;
  description: string;
};
