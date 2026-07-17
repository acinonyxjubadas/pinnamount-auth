import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 50%, #0A1628 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      textAlign: 'center',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '28px',
        }}>
          ▲
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '36px',
          fontWeight: '700',
          color: 'white',
          lineHeight: 1.2,
        }}>
          Pinnamount<br />
          <span style={{ color: '#C9A84C' }}>Escapes</span>
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '12px',
          marginTop: '6px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          A Pinnamount Legacy Universal Property
        </p>
      </div>

      {/* Tagline */}
      <p style={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: '18px',
        maxWidth: '400px',
        lineHeight: 1.6,
        marginBottom: '40px',
      }}>
        The World's Finest Resorts & Retreats, One Platform.
      </p>

      {/* Buttons */}
      {user ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <button className="btn-gold">Go to Dashboard</button>
          </Link>
          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <button className="btn-outline">My Profile</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px' }}>
          <Link href="/auth/signup" style={{ textDecoration: 'none' }}>
            <button className="btn-gold">Create Account</button>
          </Link>
          <Link href="/auth/signin" style={{ textDecoration: 'none' }}>
            <button className="btn-outline">Sign In</button>
          </Link>
        </div>
      )}

      {/* Footer */}
      <p style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: '12px',
        marginTop: '60px',
      }}>
        © {new Date().getFullYear()} Pinnamount Escapes — A Pinnamount Legacy Universal Property
      </p>
    </main>
  )
}
