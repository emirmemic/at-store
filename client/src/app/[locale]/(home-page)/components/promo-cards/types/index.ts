import { TransparentVariant } from '@/components/ui/button';
import { ImageProps, ProductResponse } from '@/lib/types';
type TextColor = 'white' | 'black';

export interface PromoCardItem {
  id: number;
  caption: string;
  learnMoreVariant: TransparentVariant;
  textColor: TextColor;
  image: ImageProps | null;
  product: ProductResponse | null;
  title: string;
}
