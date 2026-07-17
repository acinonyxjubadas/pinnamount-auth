import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut, deleteAccount, updateProfile } from '@/app/auth/actions'

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/signin')

  const fullName = user.user_metadata?.full_name || ''
  const phone = user.user_metadata?.phone || ''
  const email = user.email || ''
  const role = user.user_metadata?.role || 'guest'
  const createdAt = new Date(user.created_at).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)',
      padding: '24px',
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
        }}>
          <Link href="/dashboard" style={{
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            fontSize: '20px',
          }}>←</Link>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '24px',
            color: 'white',
            fontWeight: 700,
          }}>My Profile</h1>
        </div>

        {/* Success/Error messages */}
        {searchParams.success && (
          <div className="success-msg" style={{ marginBottom: '20px' }}>
            ✅ {decodeURIComponent(searchParams.success)}
          </div>
        )}
        {searchParams.error && (
          <div className="error-msg" style={{ marginBottom: '20px' }}>
            ❌ {decodeURIComponent(searchParams.error)}
          </div>
        )}

        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '28px',
            fontWeight: 700,
            color: '#0A1628',
          }}>
            {initials}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
            Member since {createdAt}
          </p>
          <span style={{
            display: 'inline-block',
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.3)',
            color: '#C9A84C',
            padding: '3px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            marginTop: '6px',
            textTransform: 'capitalize',
          }}>
            {role}
          </span>
        </div>

        {/* Edit Profile Form */}
        <div className="card" style={{ marginBottom: '16px' }}>
          <h3 style={{
            color: '#C9A84C',
            fontSize: '12px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Edit Profile
          </h3>
          <form action={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Full Name */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                marginBottom: '6px',
              }}>Full Name</label>
              <input
                className="input-field"
                type="text"
                name="fullName"
                defaultValue={fullName}
                placeholder="Your full name"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                marginBottom: '6px',
              }}>Phone Number</label>
              <input
                className="input-field"
                type="tel"
                name="phone"
                defaultValue={phone}
                placeholder="+254 700 000 000"
              />
            </div>

            {/* Email (read only) */}
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                marginBottom: '6px',
              }}>Email Address</label>
              <input
                className="input-field"
                type="email"
                value={email}
                readOnly
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              />
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '4px' }}>
                Email cannot be changed
              </p>
            </div>

            <button type="submit" className="btn-gold">
              Save Changes
            </button>

          </form>
        </div>

        {/* Sign Out */}
        <div className="card" style={{ marginBottom: '16px' }}>
          <h3 style={{
            color: '#C9A84C',
            fontSize: '12px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Session
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            lineHeight: 1.5,
            marginBottom: '16px',
          }}>
            You are currently signed in as <strong style={{ color: 'white' }}>{email}</strong>.
            Signing out will end your session on this device.
          </p>
          <form action={signOut}>
            <button type="submit" className="btn-outline" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              🚪 Sign Out
            </button>
          </form>
        </div>

        {/* Delete Account */}
        <div className="card" style={{
          border: '1px solid rgba(239,68,68,0.2)',
          background: 'rgba(239,68,68,0.03)',
        }}>
          <h3 style={{
            color: '#fca5a5',
            fontSize: '12px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Danger Zone
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            lineHeight: 1.5,
            marginBottom: '16px',
          }}>
            Permanently delete your account and all associated data including bookings,
            wishlists, and reviews. This action cannot be undone.
          </p>
          <form action={deleteAccount} onSubmit={(e) => {
            if (!confirm('Are you absolutely sure? This will permanently delete your account and cannot be undone.')) {
              e.preventDefault()
            }
          }}>
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'transparent',
                border: '1.5px solid rgba(239,68,68,0.5)',
                color: '#fca5a5',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              🗑️ Delete My Account
            </button>
          </form>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '11px',
          marginTop: '32px',
        }}>
          Pinnamount Escapes — A Pinnamount Legacy Universal Property
        </p>

      </div>
    </main>
  )
}
