'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { signUp } from '../actions'
import { 
  UserIcon,
  PhoneIcon,
  EnvelopeIcon, 
  LockClosedIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string }
}) {
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number
    label: string
    color: string
  } | null>(null)

  // Handle error and success messages from URL
  const errorMessage = searchParams.error 
    ? decodeURIComponent(searchParams.error) 
    : null

  const successMessage = searchParams.success 
    ? decodeURIComponent(searchParams.success) 
    : null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    
    // Clear error when user types
    if (formError) setFormError(null)

    // Check password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value))
    }

    // Check password match
    if (name === 'confirmPassword' || name === 'password') {
      const password = name === 'password' ? value : formData.password
      const confirm = name === 'confirmPassword' ? value : formData.confirmPassword
      if (confirm && password !== confirm) {
        setFormError('Passwords do not match')
      } else if (confirm && password === confirm) {
        setFormError(null)
      }
    }
  }

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const fullName = formData.get('fullName') as string
      const phone = formData.get('phone') as string
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const confirmPassword = formData.get('confirmPassword') as string

      // Client-side validation
      if (!fullName || fullName.length < 2) {
        setFormError('Please enter your full name')
        return
      }

      if (!email || !email.includes('@')) {
        setFormError('Please enter a valid email address')
        return
      }

      if (!password || password.length < 8) {
        setFormError('Password must be at least 8 characters')
        return
      }

      if (password !== confirmPassword) {
        setFormError('Passwords do not match')
        return
      }

      // Call the server action
      const result = await signUp(formData)
      
      // If there's an error, it will redirect with error param
      // If successful, it redirects to verify-email
    })
  }

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (password.match(/[a-z]/)) score++
    if (password.match(/[A-Z]/)) score++
    if (password.match(/[0-9]/)) score++
    if (password.match(/[^a-zA-Z0-9]/)) score++

    const levels = [
      { score: 0, label: 'Very Weak', color: 'text-red-500' },
      { score: 1, label: 'Weak', color: 'text-orange-500' },
      { score: 2, label: 'Fair', color: 'text-yellow-500' },
      { score: 3, label: 'Good', color: 'text-blue-400' },
      { score: 4, label: 'Strong', color: 'text-green-500' },
      { score: 5, label: 'Very Strong', color: 'text-emerald-500' },
    ]

    return levels.find(level => level.score === score) || levels[0]
  }

  return (
    <main className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* ========================================
          DECORATIVE BACKGROUND ELEMENTS
          ======================================== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-navy-700/30 rounded-full blur-3xl" />
      </div>

      {/* ========================================
          MAIN CARD
          ======================================== */}
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        
        {/* Brand Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center shadow-gold-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-navy-900 font-display font-bold text-2xl">P</span>
              </div>
              <h1 className="font-display text-2xl text-white font-bold mt-4 tracking-wide">
                Pinnamount
                <span className="block text-xs text-gold font-inter font-normal tracking-[0.2em]">
                  ESCAPES
                </span>
              </h1>
            </div>
          </Link>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl text-white font-bold">
            Join Pinnamount Escapes
          </h2>
          <p className="text-white/50 text-sm mt-2 font-inter">
            Create your account and start earning
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-msg mb-6 animate-fade-in flex items-start gap-2">
            <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message from URL */}
        {errorMessage && (
          <div className="error-msg mb-6 animate-fade-in flex items-start gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Client-side Error Message */}
        {formError && (
          <div className="error-msg mb-6 animate-fade-in flex items-start gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        {/* ========================================
            SIGN UP FORM
            ======================================== */}
        <div className="glass rounded-2xl p-8 border border-white/10 shadow-2xl">
          <form action={handleSubmit} className="space-y-4">

            {/* Full Name Field */}
            <div>
              <label 
                htmlFor="fullName"
                className="block text-white/70 text-sm font-medium mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                  <UserIcon className="w-5 h-5" />
                </div>
                <input
                  id="fullName"
                  className={`input-field pl-10 ${formError ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Emmanuel Nyongesa"
                  required
                  autoComplete="name"
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label 
                htmlFor="phone"
                className="block text-white/70 text-sm font-medium mb-2"
              >
                Phone Number <span className="text-white/30 text-xs">(optional)</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <input
                  id="phone"
                  className="input-field pl-10"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 700 000 000"
                  autoComplete="tel"
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email"
                className="block text-white/70 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  className={`input-field pl-10 ${formError ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password"
                className="block text-white/70 text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                  <LockClosedIcon className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  className={`input-field pl-10 pr-10 ${formError ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && passwordStrength && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-1 mr-3">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            level <= passwordStrength.score
                              ? passwordStrength.color.replace('text-', 'bg-')
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-xs font-medium ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <p className="text-white/30 text-[10px]">
                    Use 8+ chars with uppercase, lowercase, number & special
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label 
                htmlFor="confirmPassword"
                className="block text-white/70 text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                  <LockClosedIcon className="w-5 h-5" />
                </div>
                <input
                  id="confirmPassword"
                  className={`input-field pl-10 pr-10 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500/50 focus:border-red-500'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'border-green-500/50 focus:border-green-500'
                      : ''
                  }`}
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                  disabled={isPending}
                />
                {formData.confirmPassword && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {formData.password === formData.confirmPassword ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Terms */}
            <p className="text-white/40 text-xs leading-relaxed">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-gold hover:text-gold-light transition-colors">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-gold hover:text-gold-light transition-colors">
                Privacy Policy
              </Link>
            </p>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-gold w-full py-3.5 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner-navy inline-block" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="gold-divider my-6" />

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-white/50 text-sm">
              Already have an account?{' '}
              <Link 
                href="/auth/signin" 
                className="text-gold hover:text-gold-light font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-4 text-white/20 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Secure
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Encrypted
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Free to join
            </span>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1 text-white/30 hover:text-white/50 text-sm transition-colors duration-200 group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Pinnamount Escapes
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/10 text-xs font-inter tracking-wider">
            © {new Date().getFullYear()} Pinnamount Escapes. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  )
}