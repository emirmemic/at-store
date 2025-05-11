import localFont from 'next/font/local';

const SF_Pro_Display = localFont({
  src: [
    {
      path: './SF-Pro-Display-Light.otf',
      weight: '300',
    },
    {
      path: './SF-Pro-Display-Regular.otf',
      weight: '400',
    },
    {
      path: './SF-Pro-Display-Medium.otf',
      weight: '500',
    },
    {
      path: './SF-Pro-Display-Semibold.otf',
      weight: '600',
    },
    {
      path: './SF-Pro-Display-Bold.otf',
      weight: '700',
    },
    {
      path: './SF-Pro-Display-Black.otf',
      weight: '900',
    },
  ],
  variable: '--font-sf-pro-display',
  display: 'swap',
});

export { SF_Pro_Display };
