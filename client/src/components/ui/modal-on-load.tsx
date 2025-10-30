/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useMemo, useState } from 'react';

type ModalOnLoadProps = {
  className?: string;
  timeZone?: string;
  eventHour?: number; // default 19
  eventMinute?: number; // default 0
  graceMinutes?: number; // default 10 (do 19:10)

  /** URL pozadinske slike za header (npr. /images/event-bg.jpg) */
  backgroundImageUrl?: string;
  /** Opacity za sliku (0–1). Default 0.35 */
  backgroundOpacity?: number;
  /** Dodatne klase za overlay preko slike (npr. "from-black/40 via-black/30 to-transparent") */
  overlayClassName?: string;

  /** Fiksna visina header slike (px) za mob i md+ breakpoint */
  imageHeight?: number; // default 260
  imageHeightMd?: number; // default 360
  /** Kako uklopiti sliku u header: 'contain' (bez cropa) ili 'cover' (crop-uje višak) */
  imageFit?: 'contain' | 'cover'; // default 'contain'
};

export default function ModalOnLoad({
  className = '',
  timeZone = 'Europe/Sarajevo',
  eventHour = 19,
  eventMinute = 0,
  graceMinutes = 10,
  backgroundImageUrl,
  backgroundOpacity = 0.35,
  imageHeight = 260,
  imageHeightMd = 360,
  imageFit = 'contain',
}: ModalOnLoadProps) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // -------- Helpers za vrijeme u zadanoj zoni --------
  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    [timeZone]
  );

  const getNowParts = () => {
    const parts = fmt.formatToParts(new Date());
    const obj: Record<string, string> = {};
    for (const p of parts) {
      if (p.type !== 'literal') obj[p.type] = p.value;
    }
    const y = Number(obj.year);
    const m = Number(obj.month);
    const d = Number(obj.day);
    const H = Number(obj.hour);
    const M = Number(obj.minute);
    const S = Number(obj.second);
    return { y, m, d, H, M, S };
  };

  const todayForDisplay = useMemo(() => {
    const dateFmt = new Intl.DateTimeFormat('bs-BA', {
      timeZone,
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    return dateFmt.format(new Date());
  }, [timeZone]);

  const [remaining, setRemaining] = useState({ d: 0, h: 0, m: 0, s: 0 });

  // Prikaži samo danas i do 19:10
  useEffect(() => {
    const { H, M, S } = getNowParts();
    const eventStartTotalMin = eventHour * 60 + eventMinute;
    const hardStopTotalMin = eventStartTotalMin + graceMinutes;
    const nowTotalMin = H * 60 + M;

    if (nowTotalMin >= hardStopTotalMin) {
      setOpen(false);
      setIsVisible(false);
      return;
    }

    const t = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => setIsVisible(true));
    }, 80);

    // inicijalni countdown do 19:00
    const nowTotalSec = H * 3600 + M * 60 + S;
    const eventStartTotalSec = eventStartTotalMin * 60;
    const diffSec = Math.max(0, eventStartTotalSec - nowTotalSec);

    const d = Math.floor(diffSec / 86400);
    const h = Math.floor((diffSec % 86400) / 3600);
    const m = Math.floor((diffSec % 3600) / 60);
    const s = diffSec % 60;
    setRemaining({ d, h, m, s });

    return () => clearTimeout(t);
  }, [timeZone, eventHour, eventMinute, graceMinutes]);

  // Tick: održava countdown i gasi nakon 19:10
  useEffect(() => {
    if (!open) return;

    const tick = () => {
      const { H, M, S } = getNowParts();
      const eventStartTotalMin = eventHour * 60 + eventMinute;
      const hardStopTotalMin = eventStartTotalMin + graceMinutes;
      const nowTotalMin = H * 60 + M;

      if (nowTotalMin >= hardStopTotalMin) {
        handleClose(true);
        return;
      }

      const nowTotalSec = H * 3600 + M * 60 + S;
      const eventStartTotalSec = eventStartTotalMin * 60;
      const diffSec = Math.max(0, eventStartTotalSec - nowTotalSec);

      const d = Math.floor(diffSec / 86400);
      const h = Math.floor((diffSec % 86400) / 3600);
      const m = Math.floor((diffSec % 3600) / 60);
      const s = diffSec % 60;
      setRemaining({ d, h, m, s });
    };

    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [open, timeZone, eventHour, eventMinute, graceMinutes]);

  const handleClose = (immediate = false) => {
    setIsVisible(false);
    setTimeout(() => setOpen(false), 280);
  };

  const handleAddToCalendar = () => {
    window.location.href =
      'https://www.apple.com/v/apple-events/home/ai/built/assets/event/event.ics';
    setIsVisible(false);
    setTimeout(() => setOpen(false), 280);
  };

  if (!open) return null;

  const isCounting = remaining.d + remaining.h + remaining.m + remaining.s > 0;

  return (
    <div
      aria-hidden={!open}
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[1000] flex items-center justify-center"
    >
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={() => handleClose()}
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'bg-opacity-80' : 'bg-opacity-0'
        }`}
      />

      {/* Dialog */}
      <div
        className={`relative w-[92%] max-w-2xl transform transition-all duration-500 ${
          isVisible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-8 scale-95 opacity-0'
        } ${className}`}
        style={
          {
            '--imgH': `${imageHeight}px`,
            '--imgHMd': `${imageHeightMd}px`,
          } as React.CSSProperties
        }
      >
        <div className="relative overflow-hidden rounded-3xl bg-black pt-10 shadow-2xl ring-1 ring-white/10">
          {/* === Fixed-size image header (nice & predictable) === */}
          {backgroundImageUrl && (
            <div className="modal-img relative w-full overflow-hidden">
              <img
                src={backgroundImageUrl}
                alt=""
                className={`block h-full w-full ${
                  imageFit === 'cover' ? 'object-cover' : 'object-contain'
                }`}
                style={{ opacity: backgroundOpacity }}
                draggable={false}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${
                  // suptilni readability gradijent
                  'from-black/40 via-black/20 to-transparent'
                }`}
              />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => handleClose()}
            className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="relative px-8 pb-10 pt-8 md:px-12 md:pb-12">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Apple Event
              </h2>

              <div className="mb-6 space-y-1">
                <p className="text-base text-white/80">09.09.2025.</p>
                <p className="text-base text-white/80">
                  {String(eventHour).padStart(2, '0')}:
                  {String(eventMinute).padStart(2, '0')}h
                </p>
              </div>

              {isCounting ? (
                <AppleCountdown
                  d={remaining.d}
                  h={remaining.h}
                  m={remaining.m}
                  s={remaining.s}
                />
              ) : (
                <></>
              )}

              <button
                onClick={() => handleAddToCalendar()}
                className="group relative mt-4 inline-flex items-center justify-center overflow-hidden rounded-full bg-white/90 px-8 py-3 text-lg font-medium text-black transition-all hover:bg-white"
              >
                <span className="relative z-10">Dodaj u kalendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS: visina header slike */}
      <style jsx>{`
        .modal-img {
          height: var(--imgH);
        }
        @media (min-width: 768px) {
          .modal-img {
            height: var(--imgHMd);
          }
        }
      `}</style>
    </div>
  );
}

function AppleCountdown({
  d,
  h,
  m,
  s,
}: {
  d: number;
  h: number;
  m: number;
  s: number;
}) {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 1000);
    return () => clearInterval(id);
  }, []);

  const Tile = ({ label, value }: { label: string; value: number }) => {
    const key = `${label}-${value}`;
    return (
      <div className="flex flex-col items-center">
        {/* Card */}
        <div
          className="relative w-[70px] rounded-2xl bg-white/[0.04] px-3 py-3 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-white/10 backdrop-blur-xl md:w-[88px] md:px-4 md:py-4"
          aria-label={`${label} ${value}`}
        >
          {/* subtle top highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 via-white/0 to-white/0" />

          {/* value with smooth change */}
          <span
            key={key}
            className="relative block animate-[fadeScale_260ms_ease] select-none text-3xl font-semibold tabular-nums text-white md:text-4xl"
          >
            {String(value).padStart(2, '0')}
          </span>
        </div>
        {/* Label */}
        <span className="mt-2 select-none text-[11px] uppercase tracking-[0.12em] text-white/60 md:text-xs">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="mb-8">
      {/* Row */}
      <div className="mx-auto flex max-w-xl items-end justify-center gap-3 md:gap-4">
        {d > 0 && <Tile label="Dani" value={d} />}
        <Colon blink={blink} hidden={d === 0} />
        <Tile label="Sati" value={h} />
        <Colon blink={blink} />
        <Tile label="Minute" value={m} />
        <Colon blink={blink} />
        <Tile label="Sekunde" value={s} />
      </div>
    </div>
  );
}

function Colon({
  blink,
  hidden = false,
}: {
  blink: boolean;
  hidden?: boolean;
}) {
  if (hidden) return <div className="w-2 md:w-3" />;
  return (
    <div
      aria-hidden
      className={`mb-4 flex h-10 w-2 select-none flex-col items-center justify-between md:h-12 md:w-3 ${
        blink ? 'opacity-100' : 'opacity-30'
      } transition-opacity duration-300`}
    >
      <span className="block h-1.5 w-1.5 rounded-full bg-white/80 md:h-2 md:w-2" />
      <span className="block h-1.5 w-1.5 rounded-full bg-white/80 md:h-2 md:w-2" />
    </div>
  );
}

/* Keyframes for value change */
// Tailwind doesn't know custom keyframes here, so we inline via a style tag below.
// Copy this <style> once in your app root if you want to reuse animations globally.
if (typeof document !== 'undefined') {
  const id = 'apple-countdown-anim';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
     
    `;
    document.head.appendChild(style);
  }
}
