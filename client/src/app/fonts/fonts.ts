import localFont from "next/font/local";

const SF_Pro = localFont({
  src: [
    {
      path: "./SF-Pro.ttf",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

export { SF_Pro };
