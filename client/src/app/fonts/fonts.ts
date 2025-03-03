import localFont from 'next/font/local';

const SF_Pro_Text = localFont({
  src: [
    {
      path: './SF-Pro-Text-Regular.otf',
      weight: '400',
    },
    {
      path: './SF-Pro-Text-Medium.otf',
      weight: '500',
    },
    {
      path: './SF-Pro-Text-Semibold.otf',
      weight: '600',
    },
    {
      path: './SF-Pro-Text-Bold.otf',
      weight: '700',
    },
    {
      path: './SF-Pro-Text-Black.otf',
      weight: '900',
    },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
});

export { SF_Pro_Text };
