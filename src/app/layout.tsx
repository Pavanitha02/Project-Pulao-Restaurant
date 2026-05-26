import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { RestaurantProvider } from "@/context/RestaurantContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Taste Of Pulao's By Shreyas Grand | Premium Restaurant in Anantapur",
  description: "Indulge in authentic Andhra Pulaos, premium Biryani, Chinese starters, Tandoori, and South Indian non-veg dishes. Anantapur's finest luxury family dining experience.",
  keywords: "best biryani in Anantapur, best pulao restaurant in Anantapur, family restaurant in Anantapur, Andhra style pulao restaurant, non veg restaurants near railway station Anantapur, Taste Of Pulao, Shreyas Grand",
  openGraph: {
    title: "Taste Of Pulao's By Shreyas Grand | Premium Restaurant in Anantapur",
    description: "Experience the authentic taste of premium pulaos and biryanis. Luxury dining in the heart of Anantapur.",
    url: "https://tasteofpulaos.com",
    siteName: "Taste Of Pulao's By Shreyas Grand",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://tasteofpulaos.com",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Taste Of Pulao's By Shreyas Grand",
    "image": "https://tasteofpulaos.com/images/luxury_biryani_pulao.png",
    "@id": "https://tasteofpulaos.com/#restaurant",
    "url": "https://tasteofpulaos.com",
    "telephone": "+919876543210",
    "priceRange": "$$",
    "menu": "https://tasteofpulaos.com/#menu",
    "servesCuisine": ["Andhra", "Biryani", "Indian", "Chinese", "Tandoori"],
    "acceptsReservations": "true",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Railway Station Road",
      "addressLocality": "Anantapur",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "515001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "14.6819",
      "longitude": "77.6006"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "11:00",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "11:00",
        "closes": "23:30"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-matte-black text-soft-cream">
        <RestaurantProvider>
          {children}
        </RestaurantProvider>
      </body>
    </html>
  );
}

