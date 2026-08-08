'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { 
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

// Mock commission data
const mockCommissions = [
  {
    id: 1,
    booking: 'B-2024-001',
    amount: 450.00,
    commission: 45.00,
    rate: '10%',
    status: 'Paid',
    date: '2024-01-15',
    tier: 'Gold',
  },
  {
    id: 2,
    booking: 'B-2024-002',
    amount: 320.00,
    commission: 32.00,
    rate: '10%',
    status: 'Pending',
    date: '2024-01-14',
    tier: 'Gold',
  },
  {
    id: 3,
    booking: 'B-2024-003',
    amount: 280.00,
    commission: 19.60,
    rate: '7%',
    status: 'Confirmed',
    date: '2024-01-12',
    tier: 'Silver',
  },
  {
    id: 4,
    booking: 'B-2024-004',
    amount: 150.00,
    commission: 7.50,
    rate: '5%',
    status: 'Cancelled',
    date: '2024-01-10',
    tier: 'Bronze',
  },
]

const statusColors = {
  Paid: 'text-green-400 bg-green-500/10 border-green-500/20',
  Pending: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Confirmed: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Cancelled: 'text-red-400 bg-red-500/10 border-red-500/20',
}

export default function CommissionsPage() {
  const [filter, setFilter] = useState('all')

  const filteredCommissions = filter === 'all' 
    ? mockCommissions 
    : mockCommissions.filter(c => c.status.toLowerCase() === filter)

  const totalCommissions = mockCommissions.reduce((sum, c) => sum + c.commission, 0)
  const pendingCommissions = mockCommissions
    .filter(c => c.status === 'Pending' || c.status === 'Confirmed')
    .reduce((sum, c) => sum + c.commission, 0)

  return (
    <DashboardLayout 
      title="Commission History"
      subtitle="Track all your affiliate commissions"
      backHref="/dashboard"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm font-inter">Total Commissions</p>
          <p className="text-2xl font-bold text-white font-display">${totalCommissions.toFixed(2)}</p>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm font-inter">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 font-display">${pendingCommissions.toFixed(2)}</p>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm font-inter">Paid</p>
          <p className="text-2xl font-bold text-green-400 font-display">${(totalCommissions - pendingCommissions).toFixed(2)}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['All', 'Pending', 'Confirmed', 'Paid', 'Cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status.toLowerCase())}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === status.toLowerCase()
                ? 'bg-gold-500 text-navy-900'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Commissions Table */}
      <div className="glass rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Booking</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Commission</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Rate</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Tier</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{commission.booking}</td>
                  <td className="px-6 py-4 text-white">${commission.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gold-500 font-semibold">${commission.commission.toFixed(2)}</td>
                  <td className="px-6 py-4 text-white/70">{commission.rate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      commission.tier === 'Gold' ? 'text-gold-500 bg-gold-500/10' :
                      commission.tier === 'Silver' ? 'text-gray-300 bg-white/10' :
                      'text-amber-600 bg-amber-500/10'
                    }`}>
                      {commission.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[commission.status as keyof typeof statusColors]}`}>
                      {commission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/50 text-sm">{commission.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}