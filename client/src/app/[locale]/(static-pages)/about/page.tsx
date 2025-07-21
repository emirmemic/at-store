import { AboutPageResponse, InfoItem } from './types';
import { CardSection, ImgSection, TeamCard } from '../components';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { getCardBlocks, getInfo } from './data';

import { IconAtStoreLogo } from '@/components/icons';
import { MonoAppleBlock } from '@/components';
import { OpeningHours } from '../find-store/types';
import { fetchAPI } from '@/lib/fetch-api';
import { formatWorkingHours } from './utils';
import { getPlaceDetails } from '../find-store/actions';
import { getTranslations } from 'next-intl/server';
import qs from 'qs';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData.about' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}

const query = qs.stringify(
  {
    populate: {
      teamMembers: {
        populate: {
          image: {
            fields: [...STRAPI_IMAGE_FIELDS],
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

async function fetchPageData() {
  const path = '/api/about-page';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;

  const res = await fetchAPI<AboutPageResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  return res;
}

export default async function AboutPage() {
  const t = await getTranslations();
  const response = await fetchPageData();
  const cardBlocks = getCardBlocks(t);
  // Extend the type of info blocks to include errorMessage
  const info: InfoItem[] = getInfo(t).map((block) => ({
    ...block,
  }));
  const pageData = response?.data?.data || null;
  const teamsMembers = pageData?.teamMembers || [];
  const teamSectionTitle = pageData?.teamSectionTitle || '';

  // Function to fetch place details and handle errors
  const handlePlaceDetails = async (placeId: string) => {
    const data = await getPlaceDetails(placeId);
    if (data && 'error' in data) {
      throw new Error(data.error || t('findStorePage.errorOpeningHours'));
    }
    if (data && 'opening_hours' in data.result) {
      const openingHours = data.result.opening_hours as OpeningHours;
      const mapUrl = data.result.url;
      return {
        openingHours,
        mapUrl,
      };
    }
    return null;
  };
  // Fetch place details for each block
  // and update the content with the opening hours and map URL
  const infoWithMapsData = await Promise.all(
    info.map(async (block) => {
      const placeId = block.placeId;
      if (!placeId) {
        return block;
      }
      try {
        const data = await handlePlaceDetails(placeId);
        if (data) {
          const { openingHours, mapUrl } = data;
          const newContent = block.content.map((content) => {
            if (content.id === 'working_hours' && openingHours) {
              return {
                ...content,
                text: formatWorkingHours(openingHours),
              };
            }
            if (content.id === 'map_link') {
              return {
                ...content,
                path: mapUrl,
              };
            }
            return content;
          });
          return {
            ...block,
            content: newContent,
          };
        }
      } catch (error) {
        block.errorMessage =
          error instanceof Error
            ? error.message
            : t('findStorePage.errorOpeningHours');
      }
      return block;
    })
  );

  const styles = {
    mainContainer:
      'flex flex-col gap-12 py-12 container-max-width md:gap-16 md:py-16',
    sectionBase: 'bg-white rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.05)]',
  };
  return (
    <main
      className={`${styles.mainContainer}`}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <header>
        <h1 className="pb-16 text-center text-gray-900 heading-2 md:heading-1">
          {t('about.title')}
        </h1>
      </header>
      <section
        className={`${styles.sectionBase} flex flex-col items-center justify-center gap-12 px-3 py-12 md:gap-16 md:px-16 lg:flex-row lg:gap-12 lg:px-11 lg:py-11`}
      >
        <div className="order-1 flex-1 text-pretty text-center text-gray-700 lg:order-none lg:text-start">
          <h2 className="text-gray-900 bullet-heading-2 md:heading-4">
            {t('about.paragraphHeading')}
          </h2>
          <p className="text-gray-700 bullet-1 md:paragraph-1">
            {t('about.paragraph')}
          </p>
        </div>
        <IconAtStoreLogo className="h-16 max-w-72 text-gray-900 md:h-20 md:max-w-[354px]" />
      </section>
      <section
        className={`${styles.sectionBase} flex flex-col gap-12 px-3 py-12 md:gap-20 md:px-8 md:py-14 lg:px-11 lg:py-11`}
      >
        {infoWithMapsData.map((imageSection, index) => (
          <ImgSection key={imageSection.id} {...imageSection} index={index} />
        ))}
      </section>
      <section className="flex flex-col gap-12 py-12 md:gap-16 md:py-16 lg:gap-16">
        <h3 className="text-center text-gray-900 heading-2 md:heading-1">
          {t('about.cardBlockTitle')}
        </h3>
        <div className="flex flex-col items-center gap-12 md:flex-row md:justify-center md:gap-12 lg:gap-[70px]">
          {cardBlocks.map((cardSection) => (
            <CardSection key={cardSection.id} {...cardSection}></CardSection>
          ))}
        </div>
      </section>
      {teamsMembers && teamsMembers.length > 0 && (
        <section className="flex flex-col gap-16">
          {teamSectionTitle && (
            <h3 className="text-center text-gray-900 heading-2 md:heading-1">
              {teamSectionTitle}
            </h3>
          )}
          <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-12 md:grid-cols-3 md:gap-y-16 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
            {teamsMembers.map((member) => (
              <TeamCard key={member.id} {...member} />
            ))}
          </div>
        </section>
      )}
      <MonoAppleBlock />
    </main>
  );
}
