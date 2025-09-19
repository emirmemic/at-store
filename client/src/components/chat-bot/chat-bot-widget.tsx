'use client';

import { MessageCircle, RefreshCcw, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils/utils';

type ChatMessage = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
};

type ChatOption = {
  id: string;
  question: string;
  answer: string;
};

const CHAT_OPTIONS: ChatOption[] = [
  {
    id: 'shipping',
    question: 'Gdje vršite dostavu?',
    answer:
      'Trenutno proizvode isporučujemo širom Bosne i Hercegovine. Dostava obično traje 2-3 radna dana, zavisno od vaše lokacije.',
  },
  {
    id: 'hours',
    question: 'Koje je radno vrijeme?',
    answer:
      'Naš Web Shop je otvoren 24/7. Ako vam treba podrška uživo, tim je dostupan od ponedjeljka do petka, 09:00–17:00h, te subotom u periodu od 09:00-14:00h',
  },
  {
    id: 'human',
    question: 'Mogu li razgovarati s agentom?',
    answer:
      'Naravno. Ukoliko imate upit koji se ne nalazi na ovoj listi, molimo Vas da nas kontaktirate na broj telefona +387 33 956 188 ili putem e-maila prodaja@atstore.ba',
  },
  {
    id: 'payments',
    question: 'Koje načine plaćanja prihvatate?',
    answer:
      'Prihvatamo većinu kreditnih i debitnih kartica, te uskoro i podršku za Apple Pay. Također, uz UniCredit Shopping Card, dostupno je i plaćanje do 24 rate.',
  },
  {
    id: 'warranty',
    question: 'Da li proizvodi dolaze s garancijom?',
    answer:
      'Svi uređaji dolaze sa dvogodišnjom garancijom, koja uključuje jednu godinu Apple globalne garancije, te drugu godinu možete iskoristiti u bilo kojoj od naših poslovnica. Produžena garancija i zaštita Apple uređaja će biti dostupna uskoro.',
  },
  {
    id: 'meeting',
    question: 'Kako mogu zakazati termin sa Apple stručnjakom?',
    answer:
      'Termin sa Apple stručnjakom možete zakazati putem telefona ili +387 33 956 188 ili biranjem opcije Podrška koja se nalazi na vrhu glavnog menija.',
  },
  {
    id: 'trade-in',
    question: 'Mogu li zamijeniti svoj stari uređaj za novi?',
    answer:
      'Da. Ukoliko želite da izvršite tradein, molimo da posjetite jednu od naših poslovnica gdje će Vas kolege uputiti u naredne korake.',
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'intro',
    sender: 'bot',
    text: 'Zdravo! Ja sam AT AI. Odaberite pitanje ispod ili nam pošaljite e-mail.',
  },
];

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    ...INITIAL_MESSAGES,
  ]);
  const [answeredOptionIds, setAnsweredOptionIds] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timeout = window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [messages, isOpen]);

  // Improved mobile body scroll prevention
  useEffect(() => {
    if (!isOpen) return;
    if (typeof document === 'undefined') return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobile) return;

    const body = document.body;
    const originalStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      height: body.style.height,
    };

    const scrollY = window.scrollY || window.pageYOffset;

    // Prevent body scroll while keeping chat scrollable
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.height = '100%';

    return () => {
      Object.assign(body.style, originalStyle);
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const remainingOptions = useMemo(
    () =>
      CHAT_OPTIONS.filter((option) => !answeredOptionIds.includes(option.id)),
    [answeredOptionIds]
  );

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelectOption = (option: ChatOption) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${option.id}-question-${Date.now()}`,
        sender: 'user',
        text: option.question,
      },
      {
        id: `${option.id}-answer-${Date.now()}`,
        sender: 'bot',
        text: option.answer,
      },
    ]);
    setAnsweredOptionIds((prev) =>
      prev.includes(option.id) ? prev : [...prev, option.id]
    );
  };

  const handleResetConversation = () => {
    setMessages([...INITIAL_MESSAGES]);
    setAnsweredOptionIds([]);
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      <div
        className={cn(
          'pointer-events-auto relative flex flex-col overflow-hidden rounded-[1.65rem] border border-white/40 bg-white/55 backdrop-blur-2xl transition-all sm:rounded-[1.9rem]',
          'duration-300 ease-out',
          'h-[min(32rem,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-[20rem] sm:h-auto sm:max-h-96 sm:w-[min(20rem,calc(100vw-2.5rem))]',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible translate-y-4 opacity-0'
        )}
        style={{
          boxShadow:
            '0 18px 32px rgba(15,23,42,0.15), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        <div className="pointer-events-none absolute -top-20 right-[-40%] size-40 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.92)_0%,_rgba(255,255,255,0)_70%)] blur-3xl sm:-top-24 sm:size-52" />
        <div className="pointer-events-none absolute -bottom-14 left-[-45%] size-44 rounded-full bg-[radial-gradient(circle_at_center,_rgba(53,119,229,0.28)_0%,_rgba(53,119,229,0)_75%)] blur-3xl sm:-bottom-16 sm:size-60" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)]" />

        {/* Header */}
        <div className="relative flex flex-shrink-0 items-center justify-between gap-3 border-b border-white/60 bg-white/85 px-4 py-3 text-grey-almost-black backdrop-blur-xl sm:px-5 sm:py-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-black via-black to-grey-darkest text-white shadow-[0_8px_20px_rgba(15,23,42,0.2)] sm:size-10">
              <span className="text-xs font-semibold sm:text-sm">AT</span>
              <span className="absolute -bottom-1 right-0 size-2.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.75)] sm:size-3" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold tracking-[-0.01em] sm:text-sm">
                AT Bot
              </p>
              <p className="text-[10px] font-medium text-grey-dark sm:text-[11px]">
                Online · Tu smo da pomognemo
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Zatvori chat"
            className="rounded-full p-1.5 text-grey-darker transition-colors hover:bg-black/5 hover:text-black"
            onClick={toggleOpen}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex flex-col gap-3 overflow-y-auto bg-white/40 px-4 py-4 text-xs text-grey-almost-black sm:gap-4 sm:px-5 sm:text-sm"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            minHeight: '200px',
            maxHeight: 'calc(100vh - 400px)',
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3',
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <div
                className={cn(
                  'relative flex size-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition-transform duration-150',
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-black via-black/85 to-grey-darkest text-white'
                    : 'bg-gradient-to-br from-white/90 via-white/70 to-white/90 text-grey-almost-black'
                )}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs">
                  {message.sender === 'user' ? 'VI' : 'AT'}
                </span>
                {message.sender === 'bot' && (
                  <span className="absolute -bottom-0.5 right-0 size-2.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
                )}
              </div>
              <span
                className={cn(
                  'inline-block max-w-[calc(100%-3.5rem)] rounded-3xl px-3 py-2 leading-relaxed sm:max-w-[78%] sm:px-4',
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-black via-black/90 to-black text-white shadow-[0_14px_28px_rgba(15,23,42,0.35)]'
                    : 'border border-white/60 bg-gradient-to-br from-white/90 via-white/65 to-white/70 text-grey-almost-black shadow-[0_10px_26px_rgba(15,23,42,0.14)] backdrop-blur-xl'
                )}
              >
                {message.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Options */}
        {remainingOptions.length > 0 && (
          <div className="flex-shrink-0 border-t border-white/50 bg-white/60 px-4 py-3 backdrop-blur-xl sm:px-5 sm:py-4">
            <p className="flex items-center gap-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-grey-darker sm:text-[11px]">
              <Sparkles className="size-3.5 text-blue" /> Brzi odgovori
            </p>
            <div className="flex flex-wrap gap-2">
              {remainingOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="rounded-full border border-white/70 bg-gradient-to-r from-white/85 via-white/70 to-white/85 px-3 py-1.5 text-[10px] font-medium text-grey-almost-black shadow-[0_6px_18px_rgba(15,23,42,0.12)] transition hover:border-black/30 hover:bg-black/90 hover:text-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.18)] sm:px-3.5 sm:text-[11px]"
                  onClick={() => handleSelectOption(option)}
                >
                  {option.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Email Contact */}
        <div className="flex-shrink-0 border-t border-white/40 bg-white/55 px-4 py-2.5 text-[10px] text-grey-darker backdrop-blur-xl sm:px-5 sm:py-3 sm:text-[11px]">
          Imate poseban zahtjev?{' '}
          <a
            href="mailto:prodaja@atstore.ba"
            className="font-semibold text-grey-almost-black underline-offset-2 transition hover:text-black hover:underline"
          >
            Pošaljite e-mail na prodaja@atstore.ba
          </a>
        </div>

        {/* Reset Button */}
        <div className="flex flex-shrink-0 items-center justify-between border-t border-white/60 bg-white/70 px-4 py-2.5 text-[10px] text-grey-darker backdrop-blur-xl sm:px-5 sm:py-3 sm:text-[11px]">
          <span>Želite početi iznova?</span>
          <button
            type="button"
            onClick={handleResetConversation}
            className="inline-flex items-center gap-1.5 rounded-full border border-transparent bg-black/80 px-3 py-1.5 font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.2)] transition hover:bg-black"
          >
            <RefreshCcw className="size-3.5" />
            Resetuj
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={toggleOpen}
        className={cn(
          'pointer-events-auto mt-3 inline-flex items-center gap-2 rounded-full border border-white/50 bg-gradient-to-r from-black via-black/85 to-grey-darkest px-6 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-200',
          'hover:-translate-y-0.5 hover:border-black/60 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white'
        )}
        style={{
          boxShadow:
            '0 8px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
        aria-expanded={isOpen}
        aria-label={
          isOpen ? 'Zatvori podršku za chat' : 'Otvori podršku za chat'
        }
      >
        <MessageCircle className="size-5" />
        <span>{isOpen ? 'Zatvori chat' : 'Imaš pitanje? OK!'}</span>
      </button>
    </div>
  );
}
