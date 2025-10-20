'use client';

import { MessageCircle, RefreshCcw, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

type ChatMessage = {
  id: string;
  sender: 'bot' | 'user';
  text: ReactNode;
};

type ChatOption = {
  id: string;
  question: string;
  answer: ReactNode;
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
      'Naš Web Shop je otvoren 24/7. Ako vam treba podrška uživo, tim je dostupan od ponedjeljka do petka, 09:00–17:00h, te subotom u periodu od 09:00-14:00h.',
  },
  {
    id: 'pre-invoice',
    question: 'Kako mogu dobiti predračun?',
    answer:
      'Predračun možete dobiti nakon što napravite korisnički profil kao pravno lice. Nakon uspješne registracije, pri finaliziranju kupnje, dobijate opciju kreiranja predračuna koji stiže na vaš e-mail.',
  },
  {
    id: 'human',
    question: 'Mogu li razgovarati s agentom?',
    answer:
      'Naravno. Ukoliko imate upit koji se ne nalazi na ovoj listi, molimo Vas da nas kontaktirate na broj telefona +387 33 956 188 ili putem e-maila prodaja@atstore.ba.',
  },
  {
    id: 'payments',
    question: 'Koje načine plaćanja prihvatate?',
    answer:
      'Kupovinu na web stranici možete obaviti svim kreditnim i debitnim karticama. Online plaćanje na rate moguće je isključivo UniCredit karticama. U našim prodavnicama plaćanje na rate dostupno je putem kartica: UniCredit, Raiffeisen, NLB, Intesa i American Express. Apple Pay prihvaćamo u svim poslovnicama.',
  },
  {
    id: 'warranty',
    question: 'Da li proizvodi dolaze s garancijom?',
    answer:
      'iPhone dolazi s dvogodišnjom garancijom. Prva godina garancije vrijedi globalno i priznaje se u svim ovlaštenim Apple trgovinama širom svijeta. Druga godina garancije vrijedi u našim poslovnicama. Ostali Apple uređaji, uključujući iPad, Mac i Apple Watch, obuhvaćeni su jednogodišnjom globalnom garancijom',
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
    answer: (
      <>
        Da, ako želite koristiti Program zamjene, posjetite jednu od naših
        poslovnica. Prije dolaska, molimo pogledajte više detalja{' '}
        <a
          href="https://atstore.ba/trade-in"
          className="font-semibold text-blue-600 underline-offset-2 transition hover:text-blue-500 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          ovdje
        </a>
        .
      </>
    ),
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
  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timeout = window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [messages, isOpen]);

  // Mobile body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    if (typeof document === 'undefined') return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobile) return;

    const body = document.body;
    const scrollY = window.scrollY || window.pageYOffset;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.height = '100%';

    return () => {
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.height = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const remainingOptions = useMemo(
    () =>
      CHAT_OPTIONS.filter((option) => !answeredOptionIds.includes(option.id)),
    [answeredOptionIds]
  );

  const displayedOptions = useMemo(
    () =>
      isOptionsExpanded || remainingOptions.length <= 4
        ? remainingOptions
        : remainingOptions.slice(0, 4),
    [isOptionsExpanded, remainingOptions]
  );

  const widgetHeight = isOptionsExpanded
    ? 'min(90vh, 36rem)'
    : 'min(85vh, 30rem)';

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
    setIsOptionsExpanded(false);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end justify-end p-3 sm:bottom-6 sm:left-auto sm:right-6 sm:top-auto sm:p-0 md:p-4">
      <div
        ref={widgetRef}
        className={cn(
          'pointer-events-auto relative flex flex-col overflow-hidden rounded-3xl border border-gray-200/60 bg-white/95 backdrop-blur-2xl transition-all',
          'ease-[cubic-bezier(0.34,1.56,0.64,1)] duration-500',
          'w-full max-w-full sm:w-96 sm:max-w-md',
          'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),0_0_1px_rgba(0,0,0,0.1)]',
          isOpen
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible translate-y-8 scale-95 opacity-0'
        )}
        style={{
          maxHeight: isOpen ? widgetHeight : '0',
          height: isOpen ? widgetHeight : '0',
        }}
      >
        {/* Gradient overlays */}
        <div className="bg-gradient-radial pointer-events-none absolute -top-24 right-[-30%] h-48 w-48 rounded-full from-white/80 to-transparent blur-3xl" />

        {/* Quick Options */}
        {remainingOptions.length > 0 && (
          <div
            className={cn(
              'relative z-10 flex flex-shrink-0 flex-col gap-2.5 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl transition-all duration-500 ease-out',
              isOptionsExpanded ? 'py-4' : 'py-3'
            )}
          >
            <div className="flex items-center justify-between gap-2 px-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" /> Brzi odgovori
              </p>
              {remainingOptions.length > 4 && (
                <button
                  type="button"
                  onClick={() => setIsOptionsExpanded((prev) => !prev)}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-700 shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white active:scale-95"
                >
                  {isOptionsExpanded ? 'Sakrij' : 'Prikaži sve'}
                </button>
              )}
            </div>
            <div
              className={cn(
                'grid grid-cols-2 gap-2 px-5',
                isOptionsExpanded ? 'max-h-36 overflow-y-auto pr-4' : ''
              )}
              style={{
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
              }}
            >
              {displayedOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="rounded-2xl border border-gray-200/80 bg-white px-3.5 py-2.5 text-left text-[11px] font-semibold leading-snug text-gray-900 shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:scale-[0.98]"
                  onClick={() => handleSelectOption(option)}
                >
                  {option.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          className="relative z-10 flex flex-1 flex-col gap-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/50 px-5 py-4 text-sm text-gray-900"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            minHeight: '0',
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3 duration-300 animate-in fade-in slide-in-from-bottom-2',
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <div
                className={cn(
                  'relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full shadow-md transition-transform duration-150',
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
                    : 'bg-gradient-to-br from-white to-gray-50 text-gray-900 ring-1 ring-gray-200/50'
                )}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  {message.sender === 'user' ? 'VI' : 'AT'}
                </span>
                {message.sender === 'bot' && (
                  <span className="absolute -bottom-0.5 right-0 h-2.5 w-2.5 rounded-full bg-green-500 shadow-md shadow-green-500/50" />
                )}
              </div>
              <span
                className={cn(
                  'inline-block max-w-[calc(100%-3rem)] rounded-3xl px-4 py-2.5 text-[13px] leading-relaxed sm:max-w-[75%]',
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg shadow-gray-900/20'
                    : 'border border-gray-200/60 bg-white text-gray-900 shadow-md backdrop-blur-sm'
                )}
              >
                {message.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Email Contact */}
        <div className="relative z-10 flex-shrink-0 border-t border-gray-200/60 bg-white/80 px-5 py-3 text-[11px] text-gray-600 backdrop-blur-xl">
          Posebni upiti:{' '}
          <a
            href="mailto:prodaja@atstore.ba"
            className="font-semibold text-gray-900 underline-offset-2 transition hover:text-blue-600 hover:underline"
          >
            prodaja@atstore.ba
          </a>
        </div>

        {/* Reset Button */}
        <div className="relative z-10 flex flex-shrink-0 items-center justify-between border-t border-gray-200/60 bg-white/80 px-5 py-3 text-[11px] text-gray-600 backdrop-blur-xl">
          <span>Želite početi iznova?</span>
          <button
            type="button"
            onClick={handleResetConversation}
            className="inline-flex items-center gap-1.5 rounded-full border border-transparent bg-gray-900 px-4 py-1.5 font-semibold text-white shadow-lg shadow-gray-900/20 transition-all hover:bg-gray-800 active:scale-95"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Resetuj
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={toggleOpen}
        className={cn(
          'pointer-events-auto mt-4 inline-flex items-center gap-2.5 rounded-full border border-gray-200/60 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300',
          'hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:scale-95',
          'shadow-xl shadow-gray-900/20'
        )}
        aria-expanded={isOpen}
        aria-label={
          isOpen ? 'Zatvori podršku za chat' : 'Otvori podršku za chat'
        }
      >
        <MessageCircle className="h-5 w-5" />
        <span>{isOpen ? 'Zatvori chat' : 'Imaš pitanje? OK!'}</span>
      </button>
    </div>
  );
}
