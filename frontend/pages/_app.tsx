import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import { ToasterProvider } from "@/contexts/ToasterContext";
import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  });

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider navigate={router.push}>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <ToasterProvider>
              <Component {...pageProps} />
            </ToasterProvider>
          </NextThemesProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
};
