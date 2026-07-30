'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { signOut } from '@/app/auth/actions'
import { 
  HomeIcon, 
  CalendarIcon, 
  HeartIcon, 
  GlobeAltIcon, 
  UserIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  GiftIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full glass rounded-xl p-4 border ${
      type === 'success' ? 'border-green-500/30' : 'border-red-500/30'
    } animate-slide-down`}>
      <div className="flex items-start gap-3">
        {type === 'success' ? (
          <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        ) : (
          <XMarkIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        )}
        <p className="text-white text-sm flex-1">{message}</p>
        <button onClick={onClose} className="text-white/40 hover:text-white/60 transition-colors">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [stats, setStats] = useState({
    earnings: 1250.50,
    pendingCommissions: 342.50,
    clicks: 245,
    bookings: 18,
    conversionRate: 7.3,
    tierProgress: 65,
  })

  // Fetch user data
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/signin')
        return
      }
      
      setUser(user)
      
      // Fetch real stats from your API here
      // const response = await fetch('/api/dashboard/stats')
      // const data = await response.json()
      // setStats(data)
      
    } catch (error) {
      console.error('Error fetching user:', error)
      setToast({ message: 'Failed to load dashboard data', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchUser()
    setRefreshing(false)
    setToast({ message: 'Dashboard refreshed', type: 'success' })
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/signin')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white/50 mt-4 font-inter text-sm">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const fullName = user.user_metadata?.full_name || 'Guest'
  const firstName = fullName.split(' ')[0]
  const email = user.email || ''
  const phone = user.user_metadata?.phone || 'Not provided'
  const role = user.user_metadata?.role || 'Affiliate'
  const tier = user.user_metadata?.tier || 'Bronze'
  
  // Get initials for avatar
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <main className="min-h-screen bg-gradient-navy py-6 px-4">
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="container-pinnamount max-w-6xl">
        
        {/* ========================================
            HEADER - Branded
            ======================================== */}
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-navy-900 font-display font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="text-white font-display font-bold text-xl leading-none">
                Pinnamount
                <span className="block text-xs text-gold font-inter font-normal tracking-wider">
                  ESCAPES
                </span>
              </h1>
            </div>
          </div>
          
          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {/* Refresh Button */}
            <button
              onClick={refreshData}
              disabled={refreshing}
              className="text-white/40 hover:text-white transition-colors p-2 disabled:opacity-50"
              aria-label="Refresh dashboard"
            >
              <ArrowPathIcon className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            
            <Link 
              href="/dashboard/settings" 
              className="text-white/40 hover:text-white transition-colors p-2"
              aria-label="Settings"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </Link>
            
            <Link href="/profile" className="no-underline">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-navy-900 font-bold text-sm shadow-gold hover:shadow-gold-lg transition-all hover:scale-105 cursor-pointer">
                {initials}
              </div>
            </Link>
          </div>
        </header>

        {/* ========================================
            WELCOME SECTION
            ======================================== */}
        <section className="mb-8 animate-slide-up">
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-hero border border-gold/10">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="badge-gold">Welcome Back</span>
                <span className="badge-navy text-xs">{tier} Tier</span>
                <span className="badge-teal text-xs">{role}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-white font-bold">
                Welcome back,{' '}
                <span className="text-gradient-gold">{firstName}! 👋</span>
              </h1>
              <p className="text-white/60 mt-1 font-inter">
                Here's your affiliate performance overview
              </p>
            </div>
          </div>
        </section>

        {/* ========================================
            STATS GRID
            ======================================== */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
          <StatCard
            icon={<CurrencyDollarIcon className="w-5 h-5" />}
            title="Total Earnings"
            value={`$${stats.earnings.toFixed(2)}`}
            change="+12.5%"
            gradient="bg-gradient-gold"
          />
          <StatCard
            icon={<ClockIcon className="w-5 h-5" />}
            title="Pending Commissions"
            value={`$${stats.pendingCommissions.toFixed(2)}`}
            change="+5.2%"
            gradient="bg-gradient-teal"
          />
          <StatCard
            icon={<UserGroupIcon className="w-5 h-5" />}
            title="Total Clicks"
            value={stats.clicks}
            change="+8.2%"
            gradient="bg-gradient-navy"
          />
          <StatCard
            icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            change="+2.1%"
            gradient="bg-gradient-gold"
          />
        </section>

        {/* ========================================
            TWO COLUMN LAYOUT
            ======================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
          
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Account Summary Card */}
            <div className="glass card-hover rounded-2xl p-6">
              <h3 className="text-gold text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Account Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: fullName, icon: '👤' },
                  { label: 'Email', value: email, icon: '📧' },
                  { label: 'Phone', value: phone, icon: '📱' },
                  { label: 'Account Type', value: role, icon: '⭐' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">{item.label}</p>
                      <p className="text-white text-sm font-medium truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass card-hover rounded-2xl p-6">
              <h3 className="text-gold text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold text-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{activity.title}</p>
                      <p className="text-white/50 text-xs">{activity.description}</p>
                    </div>
                    <span className="text-white/30 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="glass card-hover rounded-2xl p-6">
              <h3 className="text-gold text-xs font-semibold uppercase tracking-wider mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{action.label}</p>
                      <p className="text-white/40 text-xs">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tier Progress */}
            <div className="glass card-hover rounded-2xl p-6">
              <h3 className="text-gold text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <GiftIcon className="w-4 h-4" />
                Tier Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Current Tier</span>
                  <span className="text-gold font-semibold">{tier}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Progress to {getNextTier(tier)}</span>
                  <span className="text-white">{stats.tierProgress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-gold rounded-full transition-all duration-500"
                    style={{ width: `${stats.tierProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/30">
                  <span>{tier}</span>
                  <span>{getNextTier(tier)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            SIGN OUT BUTTON
            ======================================== */}
        <div className="animate-slide-up">
          <button 
            onClick={handleSignOut}
            className="btn-outline w-full flex items-center justify-center gap-2 py-3"
          >
            <span>🚪</span>
            Sign Out
          </button>
        </div>

        {/* ========================================
            FOOTER
            ======================================== */}
        <footer className="mt-8 text-center">
          <p className="text-white/20 text-xs font-inter">
            Pinnamount Escapes — A Pinnamount Legacy Universal Property
          </p>
        </footer>

      </div>
    </main>
  )
}

// ============================================
// COMPONENTS
// ============================================

// Stat Card Component
function StatCard({ 
  icon, 
  title, 
  value, 
  change, 
  gradient 
}: { 
  icon: React.ReactNode
  title: string
  value: string | number
  change: string
  gradient: string
}) {
  return (
    <div className={`${gradient} rounded-2xl p-5 shadow-lg card-hover`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/70 text-xs font-medium uppercase tracking-wider">{title}</p>
          <p className="text-white text-xl font-bold mt-1 font-display">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        <span className="text-white/90 text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
          {change}
        </span>
        <span className="text-white/40 text-xs">vs last month</span>
      </div>
    </div>
  )
}

// ============================================
// DATA
// ============================================

const recentActivity = [
  {
    icon: '💰',
    title: 'Commission Earned',
    description: 'You earned $45.00 from booking #B-2024-001',
    time: '2 hours ago',
  },
  {
    icon: '👤',
    title: 'New Referral',
    description: 'John Smith signed up using your referral link',
    time: '5 hours ago',
  },
  {
    icon: '📊',
    title: 'Tier Update',
    description: 'You upgraded to Silver tier!',
    time: '1 day ago',
  },
  {
    icon: '🎯',
    title: 'Milestone Reached',
    description: 'You reached 100 total clicks',
    time: '2 days ago',
  },
]

const quickActions = [
  {
    icon: <PlusIcon className="w-5 h-5" />,
    label: 'Create Campaign',
    description: 'Generate new referral links',
    href: '/dashboard/campaigns/new',
  },
  {
    icon: <DocumentTextIcon className="w-5 h-5" />,
    label: 'View Reports',
    description: 'See detailed analytics',
    href: '/dashboard/reports',
  },
  {
    icon: <UserGroupIcon className="w-5 h-5" />,
    label: 'Referral Guide',
    description: 'Learn to earn more',
    href: '/dashboard/guide',
  },
]

// Helper function
function getNextTier(currentTier: string): string {
  const tiers = ['Bronze', 'Silver', 'Gold', 'Diamond']
  const index = tiers.indexOf(currentTier)
  return index < tiers.length - 1 ? tiers[index + 1] : 'Max Level'
}