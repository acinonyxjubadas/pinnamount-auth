import Link from 'next/link'
import { signIn } from '../actions'

export default function SignInPage({
  searchParams,
}: {
  searchParams: { error?: string; redirectTo?: string }
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
            Welcome back
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '6px' }}>
            Sign in to your Pinnamount Escapes account
          </p>
        </div>

        {/* Error message */}
        {searchParams.error && (
          <div className="error-msg" style={{ marginBottom: '20px' }}>
            {decodeURIComponent(searchParams.error)}
          </div>
        )}

        {/* Form */}
        <div className="card">
          <form action={signIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Hidden redirectTo */}
            {searchParams.redirectTo && (
              <input type="hidden" name="redirectTo" value={searchParams.redirectTo} />
            )}

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
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn-gold" style={{ marginTop: '8px' }}>
              Sign In
            </button>

          </form>

          <div className="gold-divider" />

          {/* Links */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
              Don't have an account?{' '}
              <Link href="/auth/signup" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>
            ← Back to Pinnamount Escapes
          </Link>
        </div>

      </div>
    </main>
  )
}
