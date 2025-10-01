import {
  ArrowUpRight,
  Gift,
  Infinity,
  Mail,
  Phone,
  Sparkles,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}

interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface StepItem {
  title: string;
  description: string;
}

interface OptionItem {
  title: string;
  description: string;
  accent: string;
}

interface CalloutContent {
  title: string;
  description: string;
  cta: string;
}

interface ContactContent {
  emailLabel: string;
  emailValue: string;
  phoneLabel: string;
  phoneValue: string;
}

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData.giftCards' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function GiftCardsPage() {
  const t = useTranslations('giftCardsPage');

  const hero = t.raw('hero') as HeroContent;
  const features = t.raw('features.items') as FeatureItem[];
  const steps = t.raw('steps.items') as StepItem[];
  const options = t.raw('options.items') as OptionItem[];
  const callout = t.raw('callout') as CalloutContent;
  const contact = t.raw('contact') as ContactContent;

  const featuresTitle = t('features.title');
  const featuresSubtitle = t('features.subtitle');
  const stepsTitle = t('steps.title');
  const stepsSubtitle = t('steps.subtitle');
  const optionsTitle = t('options.title');
  const heroImageAlt = t('heroImageAlt');

  const contactSectionId = 'gift-card-contact';
  const phoneHref = contact.phoneValue.replace(/\s+/g, '');
  const featureIcons = [Sparkles, Infinity, Gift];
  const featureGradients = [
    'bg-gradient-to-b from-[#e55451] to-[#cd1c18]',
    'bg-gradient-to-b from-[#003366] to-[#0f52ba]',
    'bg-gradient-to-b from-[#3C3C3B] via-[#2F2F2E] to-[#272726]',
  ];
  const optionGradients = [
    'bg-gradient-to-b from-white to-[#f5f5f7]',
    'bg-gradient-to-b from-[#f5f5f7] to-white',
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 py-4 lg:py-6">
        <div className="mb-4 flex flex-col items-center gap-5 rounded-3xl px-6 py-6 text-center md:mb-12">
          <h1 className="text-gray-900 heading-4 md:heading-1">{hero.title}</h1>
          <p className="max-w-3xl text-gray-600">{hero.description}</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-block rounded-full bg-red-deep px-6 py-3 font-semibold text-white shadow-md transition hover:bg-red-700"
              href="/checkout"
            >
              {hero.ctaPrimary}
            </Link>
          </div>
        </div>

        <section className="mx-auto mb-12 mt-4 max-w-5xl">
          <div className="mx-auto mb-10 flex max-w-full flex-col rounded-2xl p-8 text-white transition-transform duration-300 hover:-translate-y-1">
            <h3 className="mb-4 text-center text-6xl font-semibold text-red-600">
              {callout.title}
            </h3>
            <p className="text-center text-black">{callout.description}</p>
          </div>
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-gray-900">
              {featuresTitle}
            </h2>
            <p className="text-gray-600">{featuresSubtitle}</p>
          </div>
          <div className="flex flex-col gap-6 md:flex-row">
            {features.map((feature, index) => {
              const Icon = featureIcons[index] ?? Sparkles;
              const gradient = featureGradients[index] ?? 'bg-gray-800';
              return (
                <div
                  key={feature.title}
                  className={`flex w-full flex-1 flex-col rounded-2xl ${gradient} p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1`}
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-900">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="flex-grow text-white">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mb-12 max-w-5xl">
          <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">
            {optionsTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {options.map((option, index) => (
              <div
                key={option.title}
                className={`group relative overflow-hidden rounded-2xl ${optionGradients[index] ?? 'bg-white'} p-10 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-gray-500">
                    {option.accent}
                  </span>
                  <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                    {option.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-6 text-center text-3xl font-extralight tracking-tight text-gray-900">
            {stepsTitle}
          </h2>
          <p className="mb-12 text-center text-gray-600">{stepsSubtitle}</p>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <details
                key={step.title}
                className="duration-400 group rounded-3xl border border-gray-300 bg-white px-8 py-7 shadow-[0_1px_3px_rgb(0_0_0_/_0.1)] transition-shadow hover:shadow-[0_4px_10px_rgb(0_0_0_/_0.1)]"
              >
                <summary className="flex cursor-pointer select-none items-center justify-between text-xl font-semibold leading-7 text-gray-900">
                  <span className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-deep text-sm font-semibold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {step.title}
                  </span>
                  <svg
                    aria-hidden="true"
                    className="ml-4 h-6 w-6 flex-shrink-0 transform transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <p className="mt-5 max-w-prose text-base leading-7 text-gray-700">
                  {step.description}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-24" id={contactSectionId}>
          <h3 className="mb-14 text-center heading-4 md:heading-2">
            {hero.ctaSecondary}
          </h3>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3">
            <a
              className="flex cursor-pointer flex-col rounded-xl bg-gray-800 p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              href={`mailto:${contact.emailValue}`}
            >
              <div className="mb-4 flex items-center justify-center">
                <Mail className="h-12 w-12 text-white" />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-white">
                {contact.emailLabel}
              </h3>
              <p className="mb-4 text-center text-white">
                {contact.emailValue}
              </p>
              <div className="text-center">
                <span className="cursor-pointer text-blue-600 hover:underline">
                  Kontaktirajte nas
                </span>
              </div>
            </a>
            <a
              className="flex cursor-pointer flex-col rounded-xl bg-blue-600 p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              href={`tel:${phoneHref}`}
            >
              <div className="mb-4 flex items-center justify-center">
                <Phone className="h-12 w-12 text-white" />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-white">
                {contact.phoneLabel}
              </h3>
              <p className="mb-4 text-center text-white">
                {contact.phoneValue}
              </p>
              <div className="mt-auto text-center">
                <span className="cursor-pointer text-white hover:underline">
                  Pozovite nas
                </span>
              </div>
            </a>
            <Link
              className="flex cursor-pointer flex-col rounded-xl bg-red-deep p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              href="/checkout"
            >
              <div className="mb-4 flex items-center justify-center">
                <ArrowUpRight className="h-12 w-12 text-white" />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-white">
                {hero.ctaPrimary}
              </h3>
              <p className="mb-4 text-center text-white">{featuresSubtitle}</p>
              <div className="text-center">
                <span className="cursor-pointer text-white hover:underline">
                  Naručite online
                </span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
