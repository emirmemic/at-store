import { AboutPageResponse, InfoItem } from './types';
import { CardSection, ImgSection, TeamCard } from '../components';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { getCardBlocks, getInfo } from './data';

import { IconAtStoreLogo } from '@/components/icons';
import Link from 'next/link';
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
    mainContainer: 'flex flex-col gap-12 container-max-width md:gap-10',
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
      <section className="relative bg-black px-4 py-14 text-center text-white md:px-16 lg:px-32">
        <div className="mx-auto w-full">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            {t('about.title')}
          </h1>

          <p className="mt-6 text-lg text-gray-300 md:text-xl">
            {t('about.paragraph')}
          </p>
          <div className="mt-8">
            <Link
              href="/find-store"
              className="inline-block rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-100"
            >
              Pogledajte lokacije
            </Link>
          </div>
        </div>
      </section>
      <section className="border-b border-gray-200 bg-white px-4 py-20 md:px-16 lg:px-32">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 text-center md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Originalni proizvodi
            </h3>
            <p className="text-sm text-gray-600">
              Svi proizvodi u našoj ponudi su 100% originalni, s garancijom i
              podrškom.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Brza dostava
            </h3>
            <p className="text-sm text-gray-600">
              Vaše narudžbe stižu brzo, sigurno i pouzdano na vašu adresu.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Podrška kupcima
            </h3>
            <p className="text-sm text-gray-600">
              Naš tim je tu za vas – za sva pitanja i savjete tokom kupovine.
            </p>
          </div>
        </div>
      </section>
      <section className="py-15 relative w-full overflow-hidden bg-white px-4 sm:px-6 lg:px-12">
        <div className="flex w-full flex-col items-center gap-12 text-left lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {t('about.paragraphHeading')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                {t('about.paragraph')}
              </p>
              <div>
                <Link
                  href="/#"
                  className="inline-block rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  Pogledaj ponudu
                </Link>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center lg:w-1/2">
            <img
              src="/assets/images/about.jpg"
              alt="AT Store"
              className="h-auto w-[90%] max-w-md rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>
      <section className="px-4 py-2">
        <h2 className="mb-12 text-left text-3xl font-bold text-gray-900 md:text-4xl">
          Posjeti nas u našim poslovnicama
        </h2>
        <div className="flex w-full flex-col items-center justify-center gap-12 text-center lg:flex-row">
          {infoWithMapsData.map((imageSection, index) => (
            <div key={imageSection.id} className="flex-1">
              <ImgSection {...imageSection} index={index} />
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-16 bg-white px-4 py-2 md:px-16 lg:px-32">
        <h3 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          {t('about.cardBlockTitle')}
        </h3>
        <div className="flex flex-wrap justify-center gap-12">
          {cardBlocks.map((cardSection) => (
            <div
              className="w-full transition-transform hover:scale-105 sm:w-[48%] lg:w-[30%]"
              key={cardSection.id}
            >
              <CardSection {...cardSection} />
            </div>
          ))}
        </div>
      </section>
      {teamsMembers && teamsMembers.length > 0 && (
        <section className="space-y-16 bg-gray-100 px-4 py-10 md:px-16 lg:px-32">
          {teamSectionTitle && (
            <h3 className="text-center text-2xl font-bold text-gray-900 md:text-5xl">
              {teamSectionTitle}
            </h3>
          )}
          <div className="flex flex-wrap justify-center gap-8">
            {teamsMembers.map((member) => (
              <div
                key={member.id}
                className="w-full overflow-hidden rounded-xl bg-white text-center shadow-md transition-transform hover:scale-105 sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <div className="p-4">
                  <TeamCard {...member} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-black px-6 py-24 text-center text-white">
        <div className="w-full">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Fleksibilne opcije plaćanja
          </h2>
          <p className="mb-8 text-lg">
            Kako bismo dodatno olakšali kupovinu, AT Store nudi fleksibilne
            opcije financiranja u suradnji s nekoliko banaka. Plaćanje na rate
            je moguće putem UniCredit Visa Classic kartice, Raiffeisen Shopping
            kartice, te putem ProCredit banke s kojom smo ostvarili izuzetnu
            suradnju. Također, nudimo brzo kreditiranje putem MF Banke, s
            mogućnošću plaćanja do 36 mjesečnih rata.
          </p>
          <Link
            href="/payment-methods"
            className="inline-block rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-100"
          >
            Pogledaj načine plaćanja
          </Link>
        </div>
      </section>
      <div className="w-full pb-20">
        <h2 className="mb-6 pt-10 text-center text-3xl font-bold md:text-4xl">
          Kontaktirajte nas
        </h2>
        <div className="w-full space-y-4">
          {[
            {
              title: 'AT Store Workshop Unitic',
              content:
                'Fra Anđela Zvizdovića 1, Sarajevo\nTel: +387 33 956 188\nprodaja@atstore.ba\nPon – Pet: 09:00 - 17:00',
            },
            {
              title: 'AT Store B2B',
              content:
                'Fra Anđela Zvizdovića 1, Sarajevo\nTel: +387 33 956 188\nprodaja@atstore.ba\nPon – Pet: 09:00 - 17:00',
            },
            {
              title: 'AT Store Alta',
              content:
                'Franca Lehara 2, Sarajevo\nTel: +387 33 956 199\nprodaja@atstore.ba\nPon – Sub: 09:00 - 22:00',
            },
            {
              title: 'AT Store SCC',
              content:
                'Vrbanja 1, Sarajevo\nTel: +387 33 878 880\nprodaja@atstore.ba\nPon – Sub: 10:00 - 22:00',
            },
            {
              title: 'AT Store Delta',
              content:
                'Bulevar srpske vojske 8, Banja Luka\nTel: +387 51 963 788\nstoredelta@atstore.ba\nPon – Ned: 09:00 - 21:00',
            },
          ].map((item, index) => (
            <details
              key={index}
              className="rounded-xl border border-gray-200 p-4"
            >
              <summary className="cursor-pointer text-left text-lg font-semibold">
                {item.title}
              </summary>
              <p className="mt-2 whitespace-pre-line text-left text-gray-700">
                {item.content}
              </p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
