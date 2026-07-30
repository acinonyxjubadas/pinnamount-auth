// app/fonts.ts
import { Inter, Playfair_Display } from 'next/font/google'

// Inter - Primary font for body text (clean, modern)
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Playfair Display - Primary font for headings (elegant, luxury)
export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})