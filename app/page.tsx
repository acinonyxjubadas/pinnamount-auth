'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/ui/Logo'
import { useEffect, useState } from 'react'
import { 
  MagnifyingGlassIcon,
  CalendarIcon,
  UserGroupIcon,
  SparklesIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  HeartIcon,
  StarIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon
} from '@heroicons/react/24/outline'

// Mock property data with correct local image paths
const featuredProperties = [
  {
    id: 1,
    name: 'Overwater Villa',
    location: 'Maldives',
    price: 1200,
    rating: 4.9,
    reviews: 128,
    image: '/hero/properties/property-1.jpg',
    category: 'Beach'
  },
  {
    id: 2,
    name: 'Alpine Chalet',
    location: 'Swiss Alps',
    price: 850,
    rating: 4.8,
    reviews: 94,
    image: '/hero/properties/property-2.jpg',
    category: 'Mountain'
  },
  {
    id: 3,
    name: 'Cliffside Suite',
    location: 'Santorini',
    price: 980,
    rating: 4.9,
    reviews: 156,
    image: '/hero/properties/property-3.jpg',
    category: 'Beach'
  },
  {
    id: 4,
    name: 'Jungle Retreat',
    location: 'Bali',
    price: 650,
    rating: 4.7,
    reviews: 89,
    image: '/hero/properties/property-4.jpg',
    category: 'Jungle'
  },
]

const categories = [
  { icon: '🏖️', label: 'Beach', count: 24 },
  { icon: '🏔️', label: 'Mountain', count: 18 },
  { icon: '🌆', label: 'City', count: 32 },
  { icon: '🌴', label: 'Jungle', count: 12 },
  { icon: '🏜️', label: 'Desert', count: 8 },
]

// Footer links data
const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  affiliate: [
    { label: 'Become an Affiliate', href: '/auth/signup' },
    { label: 'Affiliate Dashboard', href: '/dashboard' },
    { label: 'Commission Rates', href: '/commission' },
    { label: 'Referral Guide', href: '/dashboard/guide' },
  ],
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/search' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch user on client side
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/api/auth/user')
        const data = await response.json()
        setUser(data.user || null)
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <main className="min-h-screen bg-navy-900">
      
      {/* ============================================
          NAVIGATION MENU
          ============================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="container-pinnamount">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo variant="full" />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm font-medium transition-colors font-inter"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {!loading && user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-white/60 hover:text-white text-sm font-medium transition-colors font-inter"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500/30 transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                  </Link>
                </>
              ) : !loading && !user ? (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-white/60 hover:text-white text-sm font-medium transition-colors font-inter"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="btn-gold py-2 px-4 w-auto text-sm"
                  >
                    Join Now
                  </Link>
                </>
              ) : null}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white/60 hover:text-white transition-colors p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-navy-900/95 backdrop-blur-lg border-b border-white/5">
            <div className="container-pinnamount py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-white/60 hover:text-white text-sm font-medium transition-colors font-inter py-2"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-4 space-y-3">
                {!loading && user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block text-white/60 hover:text-white text-sm font-medium transition-colors font-inter py-2"
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block text-white/60 hover:text-white text-sm font-medium transition-colors font-inter py-2"
                      onClick={closeMobileMenu}
                    >
                      Profile
                    </Link>
                  </>
                ) : !loading && !user ? (
                  <>
                    <Link
                      href="/auth/signin"
                      className="block text-white/60 hover:text-white text-sm font-medium transition-colors font-inter py-2"
                      onClick={closeMobileMenu}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block btn-gold text-center py-2 px-4 text-sm"
                      onClick={closeMobileMenu}
                    >
                      Join Now
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============================================
          HERO SECTION (with padding for fixed header)
          ============================================ */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden pt-16">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero/hero-bg.jpg"
            alt="Luxury resort"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-navy-900/60 to-navy-900" />
        </div>

        {/* Floating Decorations */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-pinnamount w-full">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium font-inter">Luxury travel redefined</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-tight mb-4">
              Discover the World's
              <span className="block text-gradient-gold">Finest Retreats</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl max-w-xl font-inter mb-8 leading-relaxed">
              Curated collection of the most exclusive resorts, villas, and retreats. 
              Book directly with Pinnamount Escapes.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 max-w-2xl">
              <form action="/search" className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="destination"
                    placeholder="Where to?"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 transition-colors font-inter"
                  />
                </div>
                <div className="relative sm:w-40">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="dates"
                    placeholder="Check in/out"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 transition-colors font-inter"
                  />
                </div>
                <button type="submit" className="btn-gold sm:w-auto w-full py-3 px-6">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CATEGORIES SECTION
          ============================================ */}
      <section className="py-12 bg-navy-800/50 border-b border-white/5">
        <div className="container-pinnamount">
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={`/search?category=${cat.label.toLowerCase()}`}
                className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-white font-medium text-sm">{cat.label}</span>
                <span className="text-white/30 text-xs">{cat.count} properties</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED PROPERTIES
          ============================================ */}
      <section className="py-16">
        <div className="container-pinnamount">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider font-inter">
                Featured
              </span>
              <h2 className="font-display text-3xl text-white font-bold">Handpicked Retreats</h2>
            </div>
            <Link
              href="/search"
              className="text-white/60 hover:text-white transition-colors font-inter text-sm flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          WHY CHOOSE US
          ============================================ */}
      <section className="py-16 bg-gradient-hero border-t border-white/5">
        <div className="container-pinnamount">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider font-inter">
              Why Pinnamount
            </span>
            <h2 className="font-display text-3xl text-white font-bold mt-2">The Ultimate Travel Experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<GlobeAltIcon className="w-6 h-6" />}
              title="Exclusive Collection"
              description="Access to the world's most exclusive resorts and retreats."
            />
            <FeatureCard
              icon={<ShieldCheckIcon className="w-6 h-6" />}
              title="Best Price Guarantee"
              description="We match any competitor's price on our properties."
            />
            <FeatureCard
              icon={<SparklesIcon className="w-6 h-6" />}
              title="Curated Experiences"
              description="Each property is personally verified by our travel experts."
            />
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER SECTION
          ============================================ */}
      <footer className="bg-navy-900 border-t border-white/5 pt-16 pb-8">
        <div className="container-pinnamount">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <Logo variant="full" />
              <p className="text-white/40 text-sm font-inter max-w-xs leading-relaxed">
                The world's finest resorts and retreats, curated for the discerning traveler.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-white/30 hover:text-gold-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/></svg>
                </a>
                <a href="#" className="text-white/30 hover:text-gold-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.534-4.733 13.878 13.878 0 001.392-5.798c0-.378-.007-.756-.023-1.132a9.936 9.936 0 002.45-2.539z"/></svg>
                </a>
                <a href="#" className="text-white/30 hover:text-gold-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.244 3.768-5.479 0-2.861-2.063-4.861-5.008-4.861-3.41 0-5.409 2.556-5.409 5.199 0 1.033.395 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.392.165-1.452-.676-2.361-2.795-2.361-4.497 0-3.661 2.659-7.021 7.663-7.021 4.021 0 7.144 2.866 7.144 6.694 0 3.991-2.518 7.209-6.018 7.209-1.176 0-2.281-.61-2.658-1.332l-.724 2.756c-.261 1.006-.972 2.267-1.449 3.036 1.088.337 2.246.519 3.443.519 6.627 0 11.994-5.367 11.994-11.987C24.011 5.367 18.644 0 12.017 0z"/></svg>
                </a>
                <a href="#" className="text-white/30 hover:text-gold-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="#" className="text-white/30 hover:text-gold-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 font-inter">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/40 hover:text-gold-500 text-sm transition-colors font-inter">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 font-inter">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/40 hover:text-gold-500 text-sm transition-colors font-inter">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Affiliate Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 font-inter">Affiliate</h4>
              <ul className="space-y-3">
                {footerLinks.affiliate.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/40 hover:text-gold-500 text-sm transition-colors font-inter">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-gold-500/10 border border-gold-500/20">
                <p className="text-gold-400 text-xs font-inter">
                  Earn up to 15% commission
                </p>
                <Link href="/auth/signup" className="text-gold-500 hover:text-gold-400 text-xs font-medium flex items-center gap-1 mt-1 transition-colors">
                  Join Now
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs font-inter">
              © {new Date().getFullYear()} Pinnamount Escapes. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-white/20 text-xs font-inter">
              <Link href="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white/40 transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-white/40 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

// ============================================
// COMPONENTS
// ============================================

function PropertyCard({ property }: { property: any }) {
  return (
    <Link href={`/property/${property.id}`} className="group">
      <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 card-hover">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white/60 hover:text-white transition-colors">
              <HeartIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 bg-gold-500/20 backdrop-blur-sm text-gold-400 text-xs rounded-full font-medium border border-gold-500/20">
              {property.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-white font-semibold font-display text-lg group-hover:text-gold-500 transition-colors">
                {property.name}
              </h3>
              <div className="flex items-center gap-1 text-white/40 text-sm mt-0.5">
                <MapPinIcon className="w-3.5 h-3.5" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
              <StarIcon className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
              <span className="text-white text-sm font-medium">{property.rating}</span>
              <span className="text-white/30 text-xs">({property.reviews})</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-white font-bold text-lg">${property.price}</span>
              <span className="text-white/30 text-sm"> / night</span>
            </div>
            <button className="text-gold-500 hover:text-gold-400 text-sm font-medium transition-colors">
              Book Now →
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass rounded-2xl p-8 border border-white/10 text-center card-hover">
      <div className="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-white font-semibold font-display text-lg mb-2">{title}</h3>
      <p className="text-white/50 font-inter text-sm">{description}</p>
    </div>
  )
}