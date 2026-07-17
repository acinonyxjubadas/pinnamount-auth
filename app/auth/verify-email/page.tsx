import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '24px',
        }}>📧</div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '28px',
          color: 'white',
          marginBottom: '12px',
        }}>
          Check your email
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '15px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}>
          We've sent a verification link to your email address.
          Click the link to activate your Pinnamount Escapes account.
        </p>

        <div className="card" style={{ textAlign: 'left', marginBottom: '24px' }}>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '13px',
            lineHeight: 1.6,
          }}>
            💡 <strong style={{ color: '#C9A84C' }}>Didn't receive it?</strong> Check your spam folder.
            The email comes from Pinnamount Escapes and may take a few minutes to arrive.
          </p>
        </div>

        <Link href="/auth/signin" style={{ textDecoration: 'none' }}>
          <button className="btn-outline">
            Back to Sign In
          </button>
        </Link>
      </div>
    </main>
  )
}
