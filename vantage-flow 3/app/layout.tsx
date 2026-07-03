import type { Metadata } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import QuickView from "@/components/QuickView";
import SearchOverlay from "@/components/SearchOverlay";
import InstallPrompt from "@/components/InstallPrompt";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { UIProvider } from "@/context/UIContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";

// Runs before hydration so dark mode / accent are correct on first paint —
// without this, the page briefly flashes the default light theme even when
// the visitor's stored preference is dark (see README "Notes").
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var dark = localStorage.getItem("vantageflow_dark_mode");
    var accent = localStorage.getItem("vantageflow_accent");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = dark ? dark === "true" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-accent", accent || "pine");
  } catch (e) {}
})();
`;

const display = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export const viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vantageflowllc.us"),
  title: {
    default: "Vantage Flow — Modern Fashion, Built to Move",
    template: "%s | Vantage Flow"
  },
  description:
    "Vantage Flow LLC designs premium apparel, footwear, accessories, and lifestyle goods engineered for movement and built to last beyond a season.",
  keywords: [
    "Vantage Flow",
    "premium fashion",
    "luxury streetwear",
    "designer footwear",
    "modern apparel brand"
  ],
  openGraph: {
    title: "Vantage Flow — Modern Fashion, Built to Move",
    description:
      "Premium apparel, footwear, accessories, and lifestyle goods engineered for movement.",
    url: "https://www.vantageflowllc.us",
    siteName: "Vantage Flow",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantage Flow — Modern Fashion, Built to Move"
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vantage Flow"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:text-bone focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <AuthSessionProvider>
          <ThemeProvider>
            <UIProvider>
              <CartProvider>
                <WishlistProvider>
                  <Nav />
                  <main id="main-content">{children}</main>
                  <Footer />
                  <CartDrawer />
                  <QuickView />
                  <SearchOverlay />
                  <InstallPrompt />
                </WishlistProvider>
              </CartProvider>
            </UIProvider>
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
