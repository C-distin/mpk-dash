import { Fraunces, Inter } from "next/font/google"

export const fraunces = Fraunces({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
})

export const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["sans-serif"],
})
