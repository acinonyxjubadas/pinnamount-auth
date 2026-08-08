'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { 
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

export default function ReportsPage() {
  // Mock data - replace with real data later
  const summaryData = {
    totalEarnings: 1250.50,
    totalClicks: 245,
    totalBookings: 18,
    conversionRate: 7.3,
    pendingCommissions: 342.50,
  }

  return (
    <DashboardLayout 
      title="Reports"
      subtitle="Your performance analytics"
      backHref="/dashboard"
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500">
              <CurrencyDollarIcon className="w-5 h-5" />
            </div>
            <p className="text-white/50 text-sm font-inter">Total Earnings</p>
          </div>
          <p className="text-2xl font-bold text-white font-display">${summaryData.totalEarnings.toFixed(2)}</p>
          <p className="text-xs text-green-400 mt-1">↑ 12.5% from last month</p>
        </div>

        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <UserGroupIcon className="w-5 h-5" />
            </div>
            <p className="text-white/50 text-sm font-inter">Total Clicks</p>
          </div>
          <p className="text-2xl font-bold text-white font-display">{summaryData.totalClicks}</p>
          <p className="text-xs text-green-400 mt-1">↑ 8.2% from last month</p>
        </div>

        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <ClipboardDocumentListIcon className="w-5 h-5" />
            </div>
            <p className="text-white/50 text-sm font-inter">Total Bookings</p>
          </div>
          <p className="text-2xl font-bold text-white font-display">{summaryData.totalBookings}</p>
          <p className="text-xs text-green-400 mt-1">↑ 15.3% from last month</p>
        </div>
      </div>

      {/* Main Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Overview */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-gold-500 font-semibold flex items-center gap-2 mb-4">
              <ChartBarIcon className="w-5 h-5" />
              Performance Overview
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Conversion Rate</span>
                  <span className="text-white font-medium">{summaryData.conversionRate}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-gold rounded-full transition-all duration-500"
                    style={{ width: `${summaryData.conversionRate * 10}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Pending Commissions</span>
                  <span className="text-yellow-400 font-medium">${summaryData.pendingCommissions.toFixed(2)}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400/60 rounded-full transition-all duration-500"
                    style={{ width: '45%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Paid Commissions</span>
                  <span className="text-green-400 font-medium">${(summaryData.totalEarnings - summaryData.pendingCommissions).toFixed(2)}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-400/60 rounded-full transition-all duration-500"
                    style={{ width: '72%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-4 border border-white/10 text-center">
              <p className="text-white/40 text-xs font-inter uppercase tracking-wider">Click-Through Rate</p>
              <p className="text-2xl font-bold text-white font-display mt-1">12.4%</p>
              <p className="text-xs text-green-400">↑ 2.1%</p>
            </div>
            <div className="glass rounded-2xl p-4 border border-white/10 text-center">
              <p className="text-white/40 text-xs font-inter uppercase tracking-wider">Avg. Commission</p>
              <p className="text-2xl font-bold text-gold-500 font-display mt-1">$69.47</p>
              <p className="text-xs text-green-400">↑ 5.3%</p>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Coming Soon */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-gold-500 font-semibold flex items-center gap-2 mb-4">
              <ArrowTrendingUpIcon className="w-5 h-5" />
              Advanced Analytics
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-white/60 text-sm">📊 Charts & Graphs</p>
                <p className="text-white/30 text-xs mt-1">Visual representation of your performance</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-white/60 text-sm">📅 Date Range Filter</p>
                <p className="text-white/30 text-xs mt-1">Filter reports by custom date ranges</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-white/60 text-sm">📥 Export Reports</p>
                <p className="text-white/30 text-xs mt-1">Download reports as PDF or CSV</p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-gold-500/10 border border-gold-500/20">
              <p className="text-gold-400 text-xs font-inter text-center">
                🚀 More analytics features coming soon
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-gold-500 font-semibold text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/70 text-sm">
                <CalendarIcon className="w-4 h-4 inline mr-2" />
                View Daily Report
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/70 text-sm">
                <ArrowTrendingUpIcon className="w-4 h-4 inline mr-2" />
                View Monthly Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}