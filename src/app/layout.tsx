import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaNeue = localFont({
  src: [
    {
      path: "../../public/assets/fonts/helvetica-neue-5/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/helvetica-neue-5/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/helvetica-neue-5/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

const bodoniModa = localFont({
  src: "../../public/assets/fonts/Bodoni_Moda/BodoniModa-VariableFont_opsz,wght.ttf",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Antaragni Campus Ambassador Program",
  description: "Lead the Legacy. Represent the Spirit of Antaragni. Join the elite network of Campus Ambassadors for India's premier cultural festival.",
  keywords: ["Antaragni", "IIT Kanpur", "Campus Ambassador", "Cultural Festival", "Student Ambassador", "College Festival"],
  authors: [{ name: "Antaragni Web Team" }],
  openGraph: {
    title: "Antaragni Campus Ambassador Program",
    description: "Lead the Legacy. Represent the Spirit of Antaragni.",
    url: "https://ca.antaragni.in",
    siteName: "Antaragni",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antaragni Campus Ambassador",
    description: "Lead the Legacy. Represent the Spirit of Antaragni.",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${helveticaNeue.variable} ${bodoniModa.variable} font-sans bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
