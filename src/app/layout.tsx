import "~/styles/globals.css";

import { Inter, Playfair_Display, Montserrat } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/app/_components/ThemeProvider";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import SessionProvider from "./_components/SessionProvider";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Janet Li | Clinical Psychology Researcher",
  description:
    "Personal website and blog of Janet Li, PhD candidate in Clinical Psychology researching mental health interventions.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${inter.variable} ${playfair.variable} ${montserrat.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <SessionProvider>
              <div className="flex min-h-screen flex-col bg-white text-gray-800">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </SessionProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
