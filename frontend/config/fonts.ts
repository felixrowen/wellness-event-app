import { Outfit } from "next/font/google";

export const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "700"],
});
