'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { 
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  WifiIcon,
  SparklesIcon,
  MapPinIcon,
  StarIcon,
  UserGroupIcon,
  ClockIcon,
  XMarkIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

// Mock property data (in real app, fetch from API)
const propertiesData = {
  '1': {
    id: 1,
    name: 'Overwater Villa',
    location: 'Maldives',
    price: 1200,
    rating: 4.9,
    reviews: 128,
    image: '/hero/properties/property-1.jpg',
    category: 'Beach',
    description: 'Experience luxury at its finest in this private overwater villa. Featuring a glass floor, infinity pool, and personal butler service.',
    amenities: ['Infinity Pool', 'Personal Butler', 'Glass Floor', 'Private Beach', 'Spa Access', 'Fine Dining', '24/7 Room Service', 'Water Sports'],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
  },
  '2': {
    id: 2,
    name: 'Alpine Chalet',
    location: 'Swiss Alps',
    price: 850,
    rating: 4.8,
    reviews: 94,
    image: '/hero/properties/property-2.jpg',
    category: 'Mountain',
    description: 'A luxurious alpine chalet with breathtaking mountain views, sauna, and cozy fireplace.',
    amenities: ['Sauna', 'Fireplace', 'Mountain Views', 'Ski Access', 'Hot Tub', 'Chef Kitchen'],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
  },
  '3': {
    id: 3,
    name: 'Cliffside Suite',
    location: 'Santorini',
    price: 980,
    rating: 4.9,
    reviews: 156,
    image: '/hero/properties/property-3.jpg',
    category: 'Beach',
    description: 'Stunning cliffside suite with caldera views and private plunge pool.',
    amenities: ['Private Pool', 'Caldera Views', 'Sunset Terrace', 'Spa Access', 'Fine Dining'],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
  },
  '4': {
    id: 4,
    name: 'Jungle Retreat',
    location: 'Bali',
    price: 650,
    rating: 4.7,
    reviews: 89,
    image: '/hero/properties/property-4.jpg',
    category: 'Jungle',
    description: 'Secluded jungle retreat with open-air living and private waterfall.',
    amenities: ['Private Waterfall', 'Open-air Living', 'Jungle Views', 'Yoga Deck', 'Spa Access'],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
  },
}

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyId = searchParams.get('id') || '1'
  
  const [property, setProperty] = useState(propertiesData[propertyId as keyof typeof propertiesData] || propertiesData['1'])
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'card',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn)
      const checkOut = new Date(formData.checkOut)
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays || 1
    }
    return 1
  }

  const nights = calculateNights()
  const totalPrice = property.price * nights

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate dates
    if (!formData.checkIn || !formData.checkOut) {
      setError('Please select check-in and check-out dates')
      setIsSubmitting(false)
      return
    }

    if (new Date(formData.checkIn) < new Date()) {
      setError('Check-in date cannot be in the past')
      setIsSubmitting(false)
      return
    }

    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      setError('Check-out must be after check-in')
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setBookingSuccess(true)
      setStep(3)
    } catch (err) {
      setError('Booking failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success page
  if (bookingSuccess) {
    return (
      <main className="min-h-screen bg-navy-900">
        <div className="container-pinnamount py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="font-display text-3xl text-white font-bold mb-4">Booking Confirmed! 🎉</h1>
            <p className="text-white/60 font-inter mb-6">
              Your stay at {property.name} has been confirmed. A confirmation email has been sent to {formData.email}.
            </p>
            <div className="glass rounded-2xl p-6 border border-white/10 mb-8 text-left">
              <h3 className="text-gold-500 font-semibold font-inter text-sm uppercase tracking-wider mb-4">Booking Details</h3>
              <div className="space-y-2 text-white/70 text-sm">
                <p><span className="text-white/40">Property:</span> {property.name}</p>
                <p><span className="text-white/40">Location:</span> {property.location}</p>
                <p><span className="text-white/40">Check-in:</span> {formData.checkIn}</p>
                <p><span className="text-white/40">Check-out:</span> {formData.checkOut}</p>
                <p><span className="text-white/40">Guests:</span> {formData.guests}</p>
                <p><span className="text-white/40">Total:</span> <span className="text-gold-500 font-bold">${totalPrice}</span></p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-gold inline-block w-auto px-8 py-3">
                Go to Dashboard
              </Link>
              <Link href="/search" className="btn-outline inline-block w-auto px-8 py-3">
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-navy-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="container-pinnamount py-4">
          <div className="flex items-center justify-between">
            <Logo variant="full" />
            <Link href="/search" className="text-white/60 hover:text-white transition-colors text-sm font-inter flex items-center gap-2">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Search
            </Link>
          </div>
        </div>
      </header>

      <div className="container-pinnamount py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Preview */}
            <div className="glass rounded-2xl overflow-hidden border border-white/10">
              <div className="relative h-64">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-display text-2xl text-white font-bold">{property.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{property.location}</span>
                      </div>
                      <span className="text-white/20">|</span>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-gold-500 fill-gold-500" />
                        <span className="text-white text-sm">{property.rating}</span>
                        <span className="text-white/40 text-sm">({property.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gold-500 font-display">${property.price}</span>
                    <span className="text-white/40 text-sm"> / night</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gold-500/20 text-gold-400 text-xs rounded-full font-medium border border-gold-500/20">
                    {property.category}
                  </span>
                  <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">
                    <UserGroupIcon className="w-3 h-3 inline mr-1" />
                    {property.maxGuests} Guests
                  </span>
                  <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">
                    <HomeIcon className="w-3 h-3 inline mr-1" />
                    {property.bedrooms} Bedrooms
                  </span>
                </div>

                <p className="text-white/60 text-sm mt-4 font-inter leading-relaxed">{property.description}</p>

                {/* Amenities */}
                <div className="mt-4">
                  <h3 className="text-white font-medium text-sm mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span key={amenity} className="px-3 py-1 bg-white/5 text-white/50 text-xs rounded-full border border-white/5 flex items-center gap-1">
                        <CheckCircleIcon className="w-3 h-3 text-gold-500" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h2 className="font-display text-xl text-white font-bold mb-4">Book Your Stay</h2>
              
              {error && (
                <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Check-in Date</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-500 transition-colors font-inter"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Check-out Date</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-500 transition-colors font-inter"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Number of Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-500 transition-colors font-inter"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="bg-navy-900">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 transition-colors font-inter"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                      <EnvelopeIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 transition-colors font-inter"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                      <PhoneIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 700 000 000"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 transition-colors font-inter"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Special Requests (optional)</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Any special requests or preferences..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 transition-colors font-inter resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="spinner-navy inline-block" />
                      Processing Booking...
                    </span>
                  ) : (
                    `Book Now - $${totalPrice}`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 border border-white/10 sticky top-24">
              <h3 className="text-gold-500 font-semibold font-inter text-sm uppercase tracking-wider mb-4">Booking Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Property</span>
                  <span className="text-white font-medium">{property.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Location</span>
                  <span className="text-white/70">{property.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Guests</span>
                  <span className="text-white/70">{formData.guests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Nights</span>
                  <span className="text-white/70">{nights}</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Price per night</span>
                    <span className="text-white">${property.price}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-white/50">Total</span>
                    <span className="text-gold-500 font-bold text-lg">${totalPrice}</span>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>Secure booking. Your payment is protected.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="glass rounded-2xl p-4 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-6 text-white/30 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Encrypted
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> 24/7 Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}