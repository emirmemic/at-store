import { ImageProps } from '@/lib/types';

interface AboutPageResponse {
  data: {
    teamMembers: TeamMember[];
    teamSectionTitle: string;
  };
}
interface TeamMember {
  id: number;
  firstName: string;
  surname: string;
  position: string;
  image: ImageProps | null;
}

interface ImageSectionItem {
  id: number;
  placeId: string;
  title: string;
  content: { text: string; path: string }[];
  image: string;
  name: string;
}

export type { AboutPageResponse, TeamMember, ImageSectionItem };
