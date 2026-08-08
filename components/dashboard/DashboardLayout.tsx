'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  LinkIcon,
  BanknotesIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  backHref?: string
}

const navItems = [
  { icon: <HomeIcon className="w-5 h-5" />, label: 'Dashboard', href: '/dashboard' },
  { icon: <LinkIcon className="w-5 h-5" />, label: 'Referral Links', href: '/dashboard/links' },
  { icon: <CurrencyDollarIcon className="w-5 h-5" />, label: 'Commissions', href: '/dashboard/commissions' },
  { icon: <BanknotesIcon className="w-5 h-5" />, label: 'Payouts', href: '/dashboard/payouts' },
  { icon: <ChartBarIcon className="w-5 h-5" />, label: 'Reports', href: '/dashboard/reports' },
  { icon: <Cog6ToothIcon className="w-5 h-5" />, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({ 
  children, 
  title, 
  subtitle, 
  backHref 
}: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-navy">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-navy-800/80 backdrop-blur-sm border border-white/10 text-white"
        >
          {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-navy-800/50 backdrop-blur-sm border-r border-white/5 p-6
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Link href="/dashboard" className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
            <span className="text-navy-900 font-bold text-sm">P</span>
          </div>
          <span className="text-white font-bold text-lg font-display">Pinnamount</span>
        </Link>
        
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-gold-500/20 text-gold-500' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            {backHref && (
              <Link 
                href={backHref} 
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4 text-sm"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back
              </Link>
            )}
            <h1 className="font-display text-2xl sm:text-3xl text-white font-bold">{title}</h1>
            {subtitle && <p className="text-white/50 font-inter text-sm sm:text-base">{subtitle}</p>}
          </div>
          
          {children}
        </main>
      </div>
    </div>
  )
}
