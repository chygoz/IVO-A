import localFont from "next/font/local";

export const ttNorms = localFont({
  src: [
    {
      path: "../assets/fonts/TT Norms Pro Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/TT Norms Pro Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/TT Norms Pro Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/TT Norms Pro Bold Italic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/fonts/TT Norms Pro ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-tt-norms",
});
