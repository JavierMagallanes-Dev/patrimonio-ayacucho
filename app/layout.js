import 'leaflet/dist/leaflet.css';
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FavoritosProvider } from "@/contexts/FavoritosContext";
import OfflineIndicator from "@/components/ui/OfflineIndicator";
import BannerEventoActivo from "@/components/eventos/BannerEventoActivo";
export const metadata = {
  title: "Patrimonio Cultural de Ayacucho",
  description: "Descubre el patrimonio cultural e histórico de Ayacucho, Perú. Explora sitios patrimoniales, rutas temáticas y servicios turísticos.",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Patrimonio Ayacucho',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

// Viewport y themeColor ahora van en una función separada
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#92400e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
         <link rel="preconnect" href="https://images.unsplash.com" />
  <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased">
        <FavoritosProvider>
          <OfflineIndicator />
           <BannerEventoActivo />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </FavoritosProvider>
      </body>
    </html>
  );
}