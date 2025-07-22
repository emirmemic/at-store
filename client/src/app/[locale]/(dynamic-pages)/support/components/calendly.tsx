'use client';

import React, { useEffect, useState } from 'react';

interface CalendlyEmbedProps {
  url: string;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
}

export default function CalendlyEmbed({
  url,
  backgroundColor = 'fff',
  textColor = '111',
  primaryColor = '111',
}: CalendlyEmbedProps) {
  const [height, setHeight] = useState('1200px');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    /*
     * The handleResize logic is added to address the mismatch between Tailwind's default breakpoints and Calendly's widget behavior. Calendly's widget requires a height adjustment at a specific breakpoint (1096px) that does not align with Tailwind's predefined breakpoints.
     */
    const handleResize = () => {
      if (window.innerWidth >= 1096) {
        setHeight('800px');
      } else {
        setHeight('1200px');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full min-w-80"
      data-resize={true}
      data-url={`${url}?background_color=${backgroundColor}&text_color=${textColor}&primary_color=${primaryColor}`}
      style={{ height }}
    ></div>
  );
}
