import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/auth/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/signin')

  const fullName = user.user_metadata?.full_name || 'Guest'
  const email = user.email || ''
  const phone = user.user_metadata?.phone || 'Not provided'
  const role = user.user_metadata?.role || 'guest'
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)',
      padding: '24px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px', color: '#C9A84C' }}>▲</span>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              color: 'white',
              fontSize: '18px',
              fontWeight: 700,
            }}>
              Pinnamount <span style={{ color: '#C9A84C' }}>Escapes</span>
            </span>
          </div>
          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A1628',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
            }}>
              {initials}
            </div>
          </Link>
        </div>

        {/* Welcome */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '32px',
            color: 'white',
            fontWeight: 700,
            marginBottom: '6px',
          }}>
            Welcome back,
          </h1>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '32px',
            color: '#C9A84C',
            fontWeight: 700,
          }}>
            {fullName.split(' ')[0]}! 👋
          </h2>
        </div>

        {/* Account summary card */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{
            color: '#C9A84C',
            fontSize: '12px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Account Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Name', value: fullName, icon: '👤' },
              { label: 'Email', value: email, icon: '📧' },
              { label: 'Phone', value: phone, icon: '📱' },
              { label: 'Account Type', value: role.charAt(0).toUpperCase() + role.slice(1), icon: '⭐' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {item.label}
                  </p>
                  <p style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'My Bookings', icon: '🏨', href: '/bookings' },
            { label: 'Wishlist', icon: '❤️', href: '/wishlist' },
            { label: 'Explore', icon: '🌍', href: '/explore' },
            { label: 'My Profile', icon: '👤', href: '/profile' },
          ].map(action => (
            <Link key={action.label} href={action.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{action.icon}</div>
                <p style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>{action.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Sign out button */}
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
