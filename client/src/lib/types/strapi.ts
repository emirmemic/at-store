// Strapi Global Components Types
interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name: string;
}

interface ActionLinkResponse {
  id: number;
  linkText?: string | null;
  linkUrl: string;
  isExternal?: boolean;
  openInNewTab?: boolean;
}
interface InfoBlockResponse {
  id: number;
  title: string;
  description?: string;
  isFavorites?: boolean;
  actionLink?: ActionLinkResponse | null;
}
interface PromoSliderItemResponse {
  id: number;
  image: ImageProps;
  actionLink: ActionLinkResponse | null;
}

interface PromotionalFlipCardResponse {
  id: number;
  tagline?: string;
  title: string;
  priceLabel?: string;
  productImage: ImageProps;
  backTagline?: string;
  backTitle: string;
  backDescription?: string;
  actionLink: ActionLinkResponse | null;
}

export type {
  ImageProps,
  InfoBlockResponse,
  ActionLinkResponse,
  PromoSliderItemResponse,
  PromotionalFlipCardResponse,
};
