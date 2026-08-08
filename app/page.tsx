import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-gradient-navy flex flex-col items-center justify-center p-6 text-center">
      {/* Logo */}
      <div className="mb-8">
        <Logo variant="full" className="justify-center" />
        <p className="text-white/40 text-xs mt-2 font-inter tracking-wider uppercase">
          A Pinnamount Legacy Universal Property
        </p>
      </div>

      {/* Tagline */}
      <p className="text-white/70 text-lg max-w-md leading-relaxed mb-10 font-inter">
        The World's Finest Resorts & Retreats, One Platform.
      </p>

      {/* Buttons */}
      {user ? (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/dashboard" className="w-full">
            <button className="btn-gold w-full">Go to Dashboard</button>
          </Link>
          <Link href="/profile" className="w-full">
            <button className="btn-outline w-full">My Profile</button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/auth/signup" className="w-full">
            <button className="btn-gold w-full">Create Account</button>
          </Link>
          <Link href="/auth/signin" className="w-full">
            <button className="btn-outline w-full">Sign In</button>
          </Link>
        </div>
      )}

      {/* Footer */}
      <p className="text-white/20 text-xs mt-16 font-inter">
        © {new Date().getFullYear()} Pinnamount Escapes — A Pinnamount Legacy Universal Property
      </p>
    </main>
  )
}