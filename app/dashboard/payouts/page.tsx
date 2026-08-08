'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { 
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'

// Mock payout data
const mockPayouts = [
  {
    id: 1,
    amount: 450.00,
    tax: 45.00,
    net: 405.00,
    method: 'M-Pesa',
    status: 'Completed',
    date: '2024-01-15',
    reference: 'MP-2024-001',
  },
  {
    id: 2,
    amount: 320.00,
    tax: 32.00,
    net: 288.00,
    method: 'Bank Transfer',
    status: 'Processing',
    date: '2024-01-14',
    reference: 'BT-2024-002',
  },
  {
    id: 3,
    amount: 280.00,
    tax: 28.00,
    net: 252.00,
    method: 'PayPal',
    status: 'Pending',
    date: '2024-01-12',
    reference: 'PP-2024-003',
  },
  {
    id: 4,
    amount: 150.00,
    tax: 15.00,
    net: 135.00,
    method: 'M-Pesa',
    status: 'Completed',
    date: '2024-01-10',
    reference: 'MP-2024-004',
  },
]

const statusColors = {
  Completed: 'text-green-400 bg-green-500/10 border-green-500/20',
  Processing: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Pending: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Failed: 'text-red-400 bg-red-500/10 border-red-500/20',
}

const methodIcons = {
  'M-Pesa': <DevicePhoneMobileIcon className="w-4 h-4" />,
  'Bank Transfer': <BuildingOfficeIcon className="w-4 h-4" />,
  'PayPal': <BanknotesIcon className="w-4 h-4" />,
}

export default function PayoutsPage() {
  const [filter, setFilter] = useState('all')

  const filteredPayouts = filter === 'all' 
    ? mockPayouts 
    : mockPayouts.filter(p => p.status.toLowerCase() === filter)

  const totalPayouts = mockPayouts.reduce((sum, p) => sum + p.net, 0)

  return (
    <DashboardLayout 
      title="Payout History"
      subtitle="Track all your payouts"
      backHref="/dashboard"
    >
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm font-inter">Total Payouts</p>
          <p className="text-2xl font-bold text-gold-500 font-display">${totalPayouts.toFixed(2)}</p>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/10">
          <p className="text-white/50 text-sm font-inter">Total Tax Withheld</p>
          <p className="text-2xl font-bold text-white font-display">
            ${mockPayouts.reduce((sum, p) => sum + p.tax, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['All', 'Pending', 'Processing', 'Completed', 'Failed'].map((status) => (
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

      {/* Payouts Table */}
      <div className="glass rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Reference</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Tax</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Net</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Method</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white/70 font-mono text-sm">{payout.reference}</td>
                  <td className="px-6 py-4 text-white">${payout.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-white/50">${payout.tax.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gold-500 font-semibold">${payout.net.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-white/70">
                      {methodIcons[payout.method as keyof typeof methodIcons]}
                      {payout.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[payout.status as keyof typeof statusColors]}`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/50 text-sm">{payout.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}