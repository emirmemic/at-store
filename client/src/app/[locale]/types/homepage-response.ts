import { StrapiButtonProps } from '@/components/ui/button';

export interface HomepageResponse {
  data: {
    title: string;
    description?: string;
    buttons: StrapiButtonProps[];
    button: StrapiButtonProps | null;
  };
}
