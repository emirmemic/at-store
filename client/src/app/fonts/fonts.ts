import localFont from 'next/font/local';

const SF_Pro = localFont({
  src: [
    {
      path: './SF-Pro.ttf',
    },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
});

const SF_Pro_Text = localFont({
  src: [
    {
      path: './SF-Pro-Text-Semibold.otf',
      weight: '600',
    },
    {
      path: './SF-Pro-Text-Bold.otf',
      weight: '700',
    },
  ],
  variable: '--font-sf-pro-text',
  display: 'swap',
});

export { SF_Pro, SF_Pro_Text };
