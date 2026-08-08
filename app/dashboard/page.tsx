'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { 
  CurrencyDollarIcon,
  UserGroupIcon,
  UserIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  GiftIcon,
  LinkIcon,
  BanknotesIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

// ============================================
// MOCK USER DATA (No Auth Required)
// ============================================

const mockUser = {
  id: 'mock-user-id',
  email: 'demo@pinnamount.com',
  user_metadata: {
    full_name: 'Naruto Uzumaki',
    phone: '+254 700 000 000',
    role: 'Affiliate',
    tier: 'Gold',
  }
}

const mockStats = {
  earnings: 1250.50,
  pendingCommissions: 342.50,
  clicks: 245,
  bookings: 18,
  conversionRate: 7.3,
  tierProgress: 65,
}

const mockRecentActivity = [
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
    description: 'You upgraded to Gold tier!',
    time: '1 day ago',
  },
  {
    icon: '🎯',
    title: 'Milestone Reached',
    description: 'You reached 100 total clicks',
    time: '2 days ago',
  },
]

// ============================================
// DASHBOARD COMPONENT
// ============================================

export default function DashboardPage() {
  const [user] = useState(mockUser)
  const [stats] = useState(mockStats)
  const [loading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fullName = user.user_metadata.full_name
  const firstName = fullName.split(' ')[0]
  const email = user.email
  const phone = user.user_metadata.phone
  const role = user.user_metadata.role
  const tier = user.user_metadata.tier
  
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const refreshData = async () => {
    setRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white/50 mt-4 font-inter text-sm">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-navy py-6 px-4">
      <div className="container-pinnamount max-w-6xl">
        
        {/* ========================================
            HEADER - Using Logo Component
            ======================================== */}
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <Logo variant="full" />
          
          <div className="flex items-center gap-2">
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
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-hero border border-gold-500/10">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            
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
            
            {/* Account Summary */}
            <div className="glass card-hover rounded-2xl p-6">
              <h3 className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
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
              <h3 className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {mockRecentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 text-lg">
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
            
            {/* Quick Actions - Updated with more links */}
            <div className="glass card-hover rounded-2xl p-6">
              <h3 className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <QuickAction
                  icon={<PlusIcon className="w-5 h-5" />}
                  label="Create Campaign"
                  href="/dashboard/campaigns/new"
                />
                <QuickAction
                  icon={<DocumentTextIcon className="w-5 h-5" />}
                  label="View Reports"
                  href="/dashboard/reports"
                />
                <QuickAction
                  icon={<LinkIcon className="w-5 h-5" />}
                  label="Referral Links"
                  href="/dashboard/links"
                />
                <QuickAction
                  icon={<CurrencyDollarIcon className="w-5 h-5" />}
                  label="Commissions"
                  href="/dashboard/commissions"
                />
                <QuickAction
                  icon={<BanknotesIcon className="w-5 h-5" />}
                  label="Payouts"
                  href="/dashboard/payouts"
                />
                <QuickAction
                  icon={<UserGroupIcon className="w-5 h-5" />}
                  label="Referral Guide"
                  href="/dashboard/guide"
                />
              </div>
            </div>

            {/* Tier Progress */}
            <div className="glass card-hover rounded-2xl p-6">
              <h3 className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <GiftIcon className="w-4 h-4" />
                Tier Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Current Tier</span>
                  <span className="text-gold-500 font-semibold">{tier}</span>
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
                  <span>Bronze</span>
                  <span>Silver</span>
                  <span>Gold</span>
                  <span>Diamond</span>
                </div>
              </div>
            </div>
          </div>
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
// STAT CARD COMPONENT
// ============================================

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
// QUICK ACTION COMPONENT
// ============================================

function QuickAction({ 
  icon, 
  label, 
  href 
}: { 
  icon: React.ReactNode
  label: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group"
    >
      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors">
        {icon}
      </div>
      <span className="text-white text-sm font-medium group-hover:text-gold-400 transition-colors">
        {label}
      </span>
    </Link>
  )
}

// ============================================
// HELPER FUNCTION
// ============================================

function getNextTier(currentTier: string): string {
  const tiers = ['Bronze', 'Silver', 'Gold', 'Diamond']
  const index = tiers.indexOf(currentTier)
  return index < tiers.length - 1 ? tiers[index + 1] : 'Max Level'
}