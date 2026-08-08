import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

// ============================================
// FONT CONFIGURATION - Pinnamount Brand Fonts
// ============================================

// Inter - Primary font for body text (clean, modern)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
})

// Playfair Display - Primary font for headings (elegant, luxury)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
  fallback: ['Georgia', 'serif'],
})

// ============================================
// METADATA - SEO & Brand Identity
// ============================================

export const metadata: Metadata = {
  title: {
    default: 'Pinnamount Escapes — Luxury Travel Affiliate Program',
    template: '%s | Pinnamount Escapes',
  },
  description: "The World's Finest Resorts & Retreats, One Platform. Join our affiliate program and earn commissions on luxury travel bookings.",
  keywords: [
    'Pinnamount Escapes',
    'Luxury Travel',
    'Affiliate Program',
    'Travel Affiliate',
    'Commission',
    'Resorts',
    'Retreats',
    'Travel Booking',
  ],
  authors: [
    { name: 'Pinnamount Escapes' },
  ],
  creator: 'Pinnamount Escapes',
  publisher: 'Pinnamount Escapes',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Pinnamount Escapes — Luxury Travel Affiliate Program',
    description: "The World's Finest Resorts & Retreats, One Platform. Join our affiliate program and earn commissions on luxury travel bookings.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Pinnamount Escapes',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pinnamount Escapes - Luxury Travel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinnamount Escapes — Luxury Travel Affiliate Program',
    description: "The World's Finest Resorts & Retreats, One Platform. Join our affiliate program and earn commissions on luxury travel bookings.",
    images: ['/images/og-image.jpg'],
    creator: '@pinnamount',
    site: '@pinnamount',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#C9A84C',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'google-site-verification-code', // Replace with your verification code
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
}

// ============================================
// VIEWPORT CONFIGURATION
// ============================================

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A1628',
  colorScheme: 'dark',
}

// ============================================
// ROOT LAYOUT
// ============================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* ==========================================
            FONT PERFORMANCE OPTIMIZATIONS
            ========================================== */}
        
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href={`https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap`}
          as="style"
        />
        <link
          rel="preload"
          href={`https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap`}
          as="style"
        />
        
        {/* ==========================================
            META TAGS
            ========================================== */}
        
        {/* Color scheme for browsers */}
        <meta name="color-scheme" content="dark" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* PWA/Web App manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      
      <body 
        className="min-h-screen bg-navy-900 font-inter antialiased"
        suppressHydrationWarning
      >
        {/* Main content */}
        {children}
        
        {/* ==========================================
            TOAST NOTIFICATIONS
            ========================================== */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0A1628',
              color: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              padding: '16px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
              fontFamily: 'Inter, system-ui, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#C9A84C',
                secondary: '#0A1628',
              },
              style: {
                border: '1px solid rgba(201, 168, 76, 0.4)',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#0A1628',
              },
              style: {
                border: '1px solid rgba(239, 68, 68, 0.4)',
              },
            },
            loading: {
              style: {
                border: '1px solid rgba(201, 168, 76, 0.2)',
              },
            },
          }}
        />
      </body>
    </html>
  )
}