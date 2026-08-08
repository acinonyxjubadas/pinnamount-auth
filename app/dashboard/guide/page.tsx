'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { 
  ShareIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  UserGroupIcon,
  ChartBarIcon,
  TrophyIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

export default function GuidePage() {
  return (
    <DashboardLayout 
      title="Referral Guide"
      subtitle="Tips to maximize your earnings"
      backHref="/dashboard"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-4 border border-white/10 text-center">
          <p className="text-2xl font-bold text-gold-500 font-display">15%</p>
          <p className="text-white/40 text-xs font-inter uppercase tracking-wider mt-1">Max Commission</p>
        </div>
        <div className="glass rounded-2xl p-4 border border-white/10 text-center">
          <p className="text-2xl font-bold text-white font-display">30</p>
          <p className="text-white/40 text-xs font-inter uppercase tracking-wider mt-1">Days Cookie Duration</p>
        </div>
        <div className="glass rounded-2xl p-4 border border-white/10 text-center">
          <p className="text-2xl font-bold text-teal-400 font-display">4</p>
          <p className="text-white/40 text-xs font-inter uppercase tracking-wider mt-1">Tier Levels</p>
        </div>
      </div>

      {/* Guide Content */}
      <div className="space-y-6">
        {/* Introduction */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500">
              <BookOpenIcon className="w-5 h-5" />
            </div>
            <h2 className="text-white font-semibold font-inter">How to Maximize Your Earnings</h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Follow these proven strategies to increase your referrals and earn more commissions. 
            The more you share, the more you earn. Every tier unlocks higher commission rates!
          </p>
        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TipCard
            icon={<ShareIcon className="w-6 h-6" />}
            title="Share on Social Media"
            description="Post your referral link on Instagram, Twitter, LinkedIn, and Facebook. Use relevant hashtags to reach a wider audience."
            color="gold"
          />
          <TipCard
            icon={<EnvelopeIcon className="w-6 h-6" />}
            title="Email Marketing"
            description="Send personalized emails to your network. Include your referral link and explain the benefits of Pinnamount Escapes."
            color="blue"
          />
          <TipCard
            icon={<PencilSquareIcon className="w-6 h-6" />}
            title="Create Content"
            description="Write blog posts, create YouTube videos, or start a podcast about your travel experiences with Pinnamount Escapes."
            color="purple"
          />
          <TipCard
            icon={<UserGroupIcon className="w-6 h-6" />}
            title="Build a Community"
            description="Start a Facebook group or Discord server for travel enthusiasts. Share exclusive deals and your referral link."
            color="teal"
          />
        </div>

        {/* Pro Tips */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <LightBulbIcon className="w-5 h-5" />
            </div>
            <h2 className="text-white font-semibold font-inter">Pro Tips</h2>
          </div>
          <div className="space-y-4">
            <ProTip
              icon="🎯"
              title="Track Your Performance"
              description="Use the Reports page to see which channels are performing best and focus your efforts there."
            />
            <ProTip
              icon="📊"
              title="Optimize Your Links"
              description="Create different referral links for different platforms to track where your traffic comes from."
            />
            <ProTip
              icon="🏆"
              title="Aim for Higher Tiers"
              description="The more referrals you make, the higher your tier. Higher tiers mean higher commission rates!"
            />
          </div>
        </div>

        {/* Tier Info */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500">
              <TrophyIcon className="w-5 h-5" />
            </div>
            <h2 className="text-white font-semibold font-inter">Tier Rewards</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TierCard
              tier="Bronze"
              rate="5%"
              requirements="0 bookings"
              color="text-amber-600 bg-amber-500/10 border-amber-500/20"
            />
            <TierCard
              tier="Silver"
              rate="7%"
              requirements="10+ bookings"
              color="text-gray-300 bg-white/10 border-white/10"
            />
            <TierCard
              tier="Gold"
              rate="10%"
              requirements="25+ bookings"
              color="text-gold-500 bg-gold-500/10 border-gold-500/20"
            />
            <TierCard
              tier="Diamond"
              rate="15%"
              requirements="50+ bookings"
              color="text-blue-400 bg-blue-500/10 border-blue-500/20"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl p-6 border border-gold-500/20 bg-gold-500/5 text-center">
          <h3 className="text-gold-500 font-semibold text-lg font-display mb-2">Ready to Start Earning?</h3>
          <p className="text-white/60 text-sm mb-4">Share your referral link and start earning commissions today!</p>
          <a 
            href="/dashboard/links" 
            className="btn-gold inline-flex items-center gap-2 px-6 py-3 w-auto"
          >
            <ArrowTrendingUpIcon className="w-4 h-4" />
            View Your Links
          </a>
        </div>
      </div>
    </DashboardLayout>
  )
}

// ============================================
// COMPONENTS
// ============================================

interface TipCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: 'gold' | 'blue' | 'purple' | 'teal'
}

function TipCard({ icon, title, description, color }: TipCardProps) {
  const colorClasses = {
    gold: 'bg-gold-500/10 text-gold-500 border-gold-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  }

  return (
    <div className={`p-6 rounded-2xl border ${colorClasses[color]}`}>
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
        <div className={colorClasses[color].split(' ')[0]}>
          {icon}
        </div>
      </div>
      <h3 className="text-white font-medium text-sm mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

interface ProTipProps {
  icon: string
  title: string
  description: string
}

function ProTip({ icon, title, description }: ProTipProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
      <span className="text-2xl">{icon}</span>
      <div>
        <h4 className="text-white font-medium text-sm">{title}</h4>
        <p className="text-white/40 text-sm mt-0.5">{description}</p>
      </div>
    </div>
  )
}

interface TierCardProps {
  tier: string
  rate: string
  requirements: string
  color: string
}

function TierCard({ tier, rate, requirements, color }: TierCardProps) {
  return (
    <div className={`p-4 rounded-xl border text-center ${color}`}>
      <p className="text-sm font-semibold">{tier}</p>
      <p className="text-2xl font-bold font-display mt-1">{rate}</p>
      <p className="text-xs opacity-60 mt-1">{requirements}</p>
    </div>
  )
}