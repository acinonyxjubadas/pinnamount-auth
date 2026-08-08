import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'full' | 'icon' | 'text'
  className?: string
}

export default function Logo({ variant = 'full', className = '' }: LogoProps) {
  // If you have an SVG logo file
  if (variant === 'icon') {
    return (
      <div className={`relative w-10 h-10 ${className}`}>
        <Image
          src="/logo-icon.svg"
          alt="Pinnamount Escapes"
          width={40}
          height={40}
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  if (variant === 'full') {
    return (
      <Link href="/" className={`flex items-center gap-3 ${className}`}>
        <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-navy-900 font-display font-bold text-lg">P</span>
        </div>
        <div>
          <h1 className="text-white font-display font-bold text-xl leading-none">
            Pinnamount
            <span className="block text-xs text-gold-500 font-inter font-normal tracking-wider">
              ESCAPES
            </span>
          </h1>
        </div>
      </Link>
    )
  }

  // Text-only version
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-lg">
        <span className="text-navy-900 font-display font-bold text-lg">P</span>
      </div>
    </Link>
  )
}