import Link from 'next/link'
import { signUp } from '../actions'

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '22px',
          }}>▲</div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '28px',
            color: 'white',
            fontWeight: 700,
          }}>
            Join Pinnamount Escapes
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '6px' }}>
            Create your account and start exploring
          </p>
        </div>

        {/* Error */}
        {searchParams.error && (
          <div className="error-msg" style={{ marginBottom: '20px' }}>
            {decodeURIComponent(searchParams.error)}
          </div>
        )}

        {/* Form */}
        <div className="card">
          <form action={signUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Full Name */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                marginBottom: '6px',
                fontWeight: 500,
              }}>
                Full Name
              </label>
              <input
                className="input-field"
                type="text"
                name="fullName"
                placeholder="Emmanuel Nyongesa"
                required
                autoComplete="name"
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                marginBottom: '6px',
                fontWeight: 500,
              }}>
                Phone Number
              </label>
              <input
                className="input-field"
                type="tel"
                name="phone"
                placeholder="+254 700 000 000"
                autoComplete="tel"
              />
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                marginBottom: '6px',
                fontWeight: 500,
              }}>
                Email Address
              </label>
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                marginBottom: '6px',
                fontWeight: 500,
              }}>
                Password
              </label>
              <input
                className="input-field"
                type="password"
                name="password"
                placeholder="At least 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            {/* Terms */}
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', lineHeight: 1.5 }}>
              By creating an account you agree to our{' '}
              <Link href="/terms" style={{ color: '#C9A84C' }}>Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" style={{ color: '#C9A84C' }}>Privacy Policy</Link>
            </p>

            {/* Submit */}
            <button type="submit" className="btn-gold">
              Create Account
            </button>

          </form>

          <div className="gold-divider" />

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link href="/auth/signin" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>
            ← Back to Pinnamount Escapes
          </Link>
        </div>

      </div>
    </main>
  )
}
