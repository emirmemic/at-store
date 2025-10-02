import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Clock3,
  Layers3,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Undo2,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { PAGE_NAMES } from '@/i18n/page-names';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}

interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  disclaimer: string;
  imageAlt: string;
}

interface StatItem {
  label: string;
  value: string;
}

interface BenefitItem {
  title: string;
  description: string;
}

interface StepItem {
  title: string;
  description: string;
}

interface EvaluationItem {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ContactContent {
  title: string;
  description: string;
  phoneLabel: string;
  phoneValue: string;
  emailLabel: string;
  emailValue: string;
  cta: string;
  disclaimer: string;
}

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData.tradeIn' });

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

export default function TradeInPage() {
  const t = useTranslations('tradeInPage');

  const hero = t.raw('hero') as HeroContent;
  const stats = (t.raw('heroStats') as StatItem[]) ?? [];
  const benefits = (t.raw('benefits.items') as BenefitItem[]) ?? [];
  const steps = (t.raw('steps.items') as StepItem[]) ?? [];
  const evaluation = (t.raw('evaluation.items') as EvaluationItem[]) ?? [];
  const faqs = (t.raw('faqs.items') as FaqItem[]) ?? [];
  const contact = t.raw('contact') as ContactContent;

  const benefitsTitle = t('benefits.title');
  const benefitsSubtitle = t('benefits.subtitle');
  const stepsTitle = t('steps.title');
  const stepsSubtitle = t('steps.subtitle');
  const evaluationTitle = t('evaluation.title');
  const evaluationSubtitle = t('evaluation.subtitle');
  const faqTitle = t('faqs.title');
  const contactTitle = t('contact.title');
  const contactDescription = t('contact.description');
  const contactDisclaimer = t('contact.disclaimer');

  const heroImageAlt = hero.imageAlt;
  const heroDisclaimer = hero.disclaimer;
  const phoneHref = contact.phoneValue.replace(/\s+/g, '');
  const processSectionId = 'trade-in-process';
  const preparationSectionId = 'trade-in-preparation';

  const statIcons = [Clock3, Layers3, BadgeCheck];
  const benefitIcons = [ShieldCheck, Sparkles, Undo2];

  return (
    <div className="relative overflow-hidden bg-[#f5f5f7] pb-24 text-gray-900">
      <div className="pointer-events-none absolute left-[-12%] top-[-160px] -z-10 h-[420px] w-[420px] rounded-full bg-[#dbe5ff] opacity-80 blur-3xl" />
      <div className="pointer-events-none absolute right-[-18%] top-[120px] -z-10 h-[420px] w-[420px] rounded-full bg-[#ffe1f6] opacity-80 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-[72%] -z-10 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#d4fff2] opacity-70 blur-[140px]" />

      <section className="relative w-full">
<<<<<<< HEAD
        <div className="relative mx-auto w-full max-w-[1300px] overflow-hidden bg-black">
=======
        <div className="relative mx-auto w-full max-w-[1500px] overflow-hidden bg-black">
>>>>>>> bdb8c8e (Feature: Address)
          <div className="relative aspect-[16/9] min-h-[240px] w-full sm:min-h-[360px]">
            <Image
              alt={heroImageAlt}
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src="/assets/images/tradein.webp"
            />
          </div>
<<<<<<< HEAD
        </div>
      </section>
=======
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </div>
      </section>

>>>>>>> bdb8c8e (Feature: Address)
      <section className="relative mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:pb-24">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
          {hero.eyebrow}
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 md:text-lg">
          {hero.description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
<<<<<<< HEAD
            className="inline-flex items-center justify-center rounded-full bg-[#3577E5] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,23,42,0.25)] transition hover:bg-gray-800"
=======
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,23,42,0.25)] transition hover:bg-gray-800"
>>>>>>> bdb8c8e (Feature: Address)
            href={PAGE_NAMES.FIND_STORE}
          >
            {hero.primaryCta}
          </Link>
          <a
<<<<<<< HEAD
            className="inline-flex items-center justify-center rounded-full border border-slate-300/60 bg-white/60 px-7 py-3 text-sm font-semibold text-slate-800 transition"
=======
            className="inline-flex items-center justify-center rounded-full border border-slate-300/60 px-7 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white/70"
>>>>>>> bdb8c8e (Feature: Address)
            href={`#${processSectionId}`}
          >
            {hero.secondaryCta}
          </a>
        </div>
        <p className="mt-8 text-xs uppercase tracking-wide text-slate-500">
          {heroDisclaimer}
        </p>
<<<<<<< HEAD
        {/* {stats.length > 0 && (
          <div className="mt-12 grid gap-4 sm:grid-cols-1">
=======
        {stats.length > 0 && (
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
>>>>>>> bdb8c8e (Feature: Address)
            {stats.map((stat, index) => {
              const Icon = statIcons[index] ?? BadgeCheck;
              return (
                <div
                  key={`${stat.label}-${index}`}
                  className="flex flex-col items-center gap-3 rounded-[22px] border border-slate-200/70 bg-white/60 px-5 py-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-lg"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg">
                    <Icon className="size-5" />
                  </span>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </p>
                  <p className="text-xl font-semibold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>
<<<<<<< HEAD
        )} */}
=======
        )}
>>>>>>> bdb8c8e (Feature: Address)
      </section>

      <section className="relative mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
<<<<<<< HEAD
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
=======
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
>>>>>>> bdb8c8e (Feature: Address)
            {benefitsTitle}
          </h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            {benefitsSubtitle}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefitIcons[index] ?? ShieldCheck;
            return (
              <div
                key={`${benefit.title}-${index}`}
                className="flex h-full flex-col gap-5 rounded-[28px] border border-white/70 bg-white/70 p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)]"
              >
<<<<<<< HEAD
                <span className="flex size-14 items-center justify-center rounded-2xl bg-[#6585B4] text-white shadow-lg">
                  <Icon className="size-7 text-[#fff]" />
=======
                <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white shadow-lg">
                  <Icon className="size-7" />
>>>>>>> bdb8c8e (Feature: Address)
                </span>
                <h3 className="text-xl font-semibold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 md:text-base">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="relative mx-auto mt-20 max-w-6xl px-4"
        id={processSectionId}
      >
        <div className="relative overflow-hidden rounded-[40px] border border-white/70 bg-white/70 p-6 shadow-[0_35px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl lg:grid-cols-[1fr_1.2fr] lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {stepsSubtitle}
              </p>
<<<<<<< HEAD
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
=======
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
>>>>>>> bdb8c8e (Feature: Address)
                {stepsTitle}
              </h2>
              <p className="text-base text-slate-600">{heroDisclaimer}</p>
              <Link
<<<<<<< HEAD
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3577E5] transition hover:text-slate-700"
=======
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-700"
>>>>>>> bdb8c8e (Feature: Address)
                href={PAGE_NAMES.FIND_STORE}
              >
                {hero.primaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
<<<<<<< HEAD
            <ol className="space-y-2">
=======
            <ol className="space-y-6">
>>>>>>> bdb8c8e (Feature: Address)
              {steps.map((step, index) => (
                <li
                  key={`${step.title}-${index}`}
                  className="group flex gap-4 rounded-3xl border border-white/60 bg-white/80 p-6 transition hover:-translate-y-1 hover:border-white/80 hover:bg-white"
                >
<<<<<<< HEAD
                  <span className="mt-1 flex size-12 items-center justify-center rounded-2xl bg-[#6585B4] text-base font-semibold text-white shadow-lg">
=======
                  <span className="mt-1 flex size-12 items-center justify-center rounded-2xl bg-gray-900 text-base font-semibold text-white shadow-lg">
>>>>>>> bdb8c8e (Feature: Address)
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 md:text-base">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        className="relative mx-auto mt-20 flex max-w-6xl flex-col gap-8 px-4 lg:flex-row"
        id={preparationSectionId}
      >
<<<<<<< HEAD
<<<<<<< HEAD
        {/* <div className="flex-1 rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.07)] backdrop-blur-xl md:p-8">
=======
        <div className="flex-1 rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.07)] backdrop-blur-xl md:p-8">
>>>>>>> bdb8c8e (Feature: Address)
=======
        {/* <div className="flex-1 rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.07)] backdrop-blur-xl md:p-8">
>>>>>>> 56644d8 (Feature: Incoming)
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            {preparationTitle}
          </h2>
          <ul className="mt-6 space-y-5">
            {checklist.map((item, index) => (
              <li className="flex gap-3" key={`${item.title}-${index}`}>
                <span className="mt-1 flex size-8 items-center justify-center rounded-full bg-gray-900 text-white shadow-md">
                  <CheckCircle2 className="size-4" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600 md:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
<<<<<<< HEAD
<<<<<<< HEAD
        </div> */}
        <div className="relative flex-1 overflow-hidden rounded-[32px] border border-slate-200 bg-[#fff] p-6 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-8">
          <div className="relative space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#111]">
=======
        </div>
=======
        </div> */}
>>>>>>> 56644d8 (Feature: Incoming)
        <div className="relative flex-1 overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.45)] md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_rgba(15,23,42,0.65))]" />
          <div className="relative space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
>>>>>>> bdb8c8e (Feature: Address)
              {hero.eyebrow}
            </p>
            <h2 className="text-2xl font-semibold md:text-3xl">
              {evaluationTitle}
            </h2>
<<<<<<< HEAD
            <p className="text-sm text-slate-600 md:text-base">
=======
            <p className="text-sm text-white/80 md:text-base">
>>>>>>> bdb8c8e (Feature: Address)
              {evaluationSubtitle}
            </p>
          </div>
          <div className="relative mt-6 space-y-5">
            {evaluation.map((item, index) => (
              <div
<<<<<<< HEAD
                className="rounded-2xl border border-white/0 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                key={`${item.title}-${index}`}
              >
                <div className="flex items-center gap-3">
                  <ClipboardList className="size-5 text-slate-900" />
                  <p className="text-2xl font-semibold text-slate-900">
                    {item.title}
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-600 md:text-base">
=======
                className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
                key={`${item.title}-${index}`}
              >
                <div className="flex items-center gap-3">
                  <ClipboardList className="size-5 text-white" />
                  <p className="text-lg font-semibold text-white">
                    {item.title}
                  </p>
                </div>
                <p className="mt-2 text-sm text-white/80 md:text-base">
>>>>>>> bdb8c8e (Feature: Address)
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
<<<<<<< HEAD

<<<<<<< HEAD
      {/* <section className="relative mx-auto mt-20 max-w-5xl px-4">
=======
=======
      {/* 
>>>>>>> 56644d8 (Feature: Incoming)
      <section className="relative mx-auto mt-20 max-w-5xl px-4">
>>>>>>> bdb8c8e (Feature: Address)
        <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-6 text-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_rgba(245,245,247,0.35))]" />
          <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-5 text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {storeHighlight.hours}
              </span>
              <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                {storeHighlight.title}
              </h2>
              <p className="text-sm text-slate-600 md:text-base">
                {storeHighlight.description}
              </p>
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(15,23,42,0.2)] transition hover:bg-gray-800"
                href={PAGE_NAMES.FIND_STORE}
              >
                <MapPin className="size-4" />
                {storeHighlight.cta}
              </Link>
            </div>
            <div className="space-y-4 rounded-[22px] border border-white/50 bg-white/70 p-6 shadow-inner">
              <div className="flex items-start gap-3 text-slate-700">
                <ShieldCheck className="size-5 text-slate-900" />
                <p className="text-sm text-slate-700">{heroDisclaimer}</p>
              </div>
              <div className="flex items-start gap-3 text-slate-700">
                <Clock3 className="size-5 text-slate-900" />
                <p className="text-sm text-slate-700">{storeHighlight.hours}</p>
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
      </section> */}
=======
      </section>
>>>>>>> bdb8c8e (Feature: Address)
=======
      </section> */}
>>>>>>> 56644d8 (Feature: Incoming)

      <section className="relative mx-auto mt-20 max-w-5xl px-4">
        <h2 className="text-center text-3xl font-semibold text-slate-900 md:text-4xl">
          {faqTitle}
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={`${faq.question}-${index}`}
              className="group rounded-[28px] border border-white/70 bg-white/70 p-6 text-left shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:border-white/80"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-slate-900">
                <span>{faq.question}</span>
                <ArrowRight className="size-5 text-slate-400 transition group-open:rotate-90" />
              </summary>
              <p className="mt-4 text-sm text-slate-600 md:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="relative mx-auto mt-20 max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-[40px] border border-white/70 bg-white/60 p-6 text-slate-900 shadow-[0_35px_90px_rgba(15,23,42,0.1)] backdrop-blur-2xl md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),_rgba(245,245,247,0.35))]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                {contactTitle}
              </h2>
              <p className="text-sm text-slate-600 md:text-base">
                {contactDescription}
              </p>
<<<<<<< HEAD
              <p className="text-xs tracking-wide text-slate-500">
=======
              <p className="text-xs uppercase tracking-wide text-slate-500">
>>>>>>> bdb8c8e (Feature: Address)
                {contactDisclaimer}
              </p>
            </div>
            <div className="space-y-4">
              <a
                className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 p-4 text-sm font-semibold text-slate-900 shadow-[0_15px_45px_rgba(15,23,42,0.05)] transition hover:bg-white"
                href={`tel:${phoneHref}`}
              >
<<<<<<< HEAD
                <span className="flex size-10 items-center justify-center rounded-full bg-[#4EE967] text-white shadow-md">
=======
                <span className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-md">
>>>>>>> bdb8c8e (Feature: Address)
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {contact.phoneLabel}
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {contact.phoneValue}
                  </p>
                </div>
              </a>
              <a
                className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 p-4 text-sm font-semibold text-slate-900 shadow-[0_15px_45px_rgba(15,23,42,0.05)] transition hover:bg-white"
                href={`mailto:${contact.emailValue}`}
              >
<<<<<<< HEAD
                <span className="flex size-10 items-center justify-center rounded-full bg-[#2576FB] text-white shadow-md">
=======
                <span className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-md">
>>>>>>> bdb8c8e (Feature: Address)
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {contact.emailLabel}
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {contact.emailValue}
                  </p>
                </div>
              </a>
<<<<<<< HEAD
              <div className="flex w-full justify-end pt-2">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-[#3577E5] px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(15,23,42,0.25)] transition"
                  href={`mailto:${contact.emailValue}`}
                >
                  {contact.cta}
                  <ArrowRight className="size-4" />
                </a>
              </div>
=======
              <a
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(15,23,42,0.25)] transition hover:bg-gray-800"
                href={`mailto:${contact.emailValue}`}
              >
                {contact.cta}
                <ArrowRight className="size-4" />
              </a>
>>>>>>> bdb8c8e (Feature: Address)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
