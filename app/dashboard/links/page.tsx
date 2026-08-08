'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Link from 'next/link'
import { 
  LinkIcon,
  PlusIcon,
  ClipboardIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

// Mock referral links data
const mockLinks = [
  {
    id: 1,
    name: 'Summer Campaign',
    url: 'https://pinnamount.com/r/SUMMER2024',
    code: 'SUMMER2024',
    clicks: 45,
    conversions: 3,
    status: 'Active',
    created: '2024-01-15',
  },
  {
    id: 2,
    name: 'Blog Post',
    url: 'https://pinnamount.com/r/BLOG-01',
    code: 'BLOG-01',
    clicks: 32,
    conversions: 2,
    status: 'Active',
    created: '2024-01-14',
  },
  {
    id: 3,
    name: 'Social Media',
    url: 'https://pinnamount.com/r/SOCIAL-01',
    code: 'SOCIAL-01',
    clicks: 18,
    conversions: 1,
    status: 'Inactive',
    created: '2024-01-12',
  },
]

export default function ReferralLinksPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const copyToClipboard = (url: string, id: number) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <DashboardLayout 
      title="Referral Links"
      subtitle="Manage all your referral links"
      backHref="/dashboard"
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-end mb-8">
        <Link 
          href="/dashboard/campaigns/new" 
          className="btn-gold inline-flex items-center gap-2 px-6 py-3 w-auto"
        >
          <PlusIcon className="w-4 h-4" />
          Create New Link
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-2xl p-4 border border-white/10">
          <p className="text-white/50 text-xs font-inter">Total Links</p>
          <p className="text-xl font-bold text-white">{mockLinks.length}</p>
        </div>
        <div className="glass rounded-2xl p-4 border border-white/10">
          <p className="text-white/50 text-xs font-inter">Active</p>
          <p className="text-xl font-bold text-green-400">{mockLinks.filter(l => l.status === 'Active').length}</p>
        </div>
        <div className="glass rounded-2xl p-4 border border-white/10">
          <p className="text-white/50 text-xs font-inter">Total Clicks</p>
          <p className="text-xl font-bold text-white">{mockLinks.reduce((sum, l) => sum + l.clicks, 0)}</p>
        </div>
        <div className="glass rounded-2xl p-4 border border-white/10">
          <p className="text-white/50 text-xs font-inter">Conversions</p>
          <p className="text-xl font-bold text-gold-500">{mockLinks.reduce((sum, l) => sum + l.conversions, 0)}</p>
        </div>
      </div>

      {/* Links Table */}
      <div className="glass rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Link</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Clicks</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Conv.</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-white/50 text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockLinks.map((link) => (
                <tr key={link.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{link.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-sm truncate max-w-[150px]">{link.url}</span>
                      <button
                        onClick={() => copyToClipboard(link.url, link.id)}
                        className="text-white/40 hover:text-gold-500 transition-colors"
                        aria-label="Copy link"
                      >
                        {copiedId === link.id ? (
                          <CheckIcon className="w-4 h-4 text-green-400" />
                        ) : (
                          <ClipboardIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{link.clicks}</td>
                  <td className="px-6 py-4 text-white">{link.conversions}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      link.status === 'Active'
                        ? 'text-green-400 bg-green-500/10 border-green-500/20'
                        : 'text-gray-400 bg-white/5 border-white/10'
                    }`}>
                      {link.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-white/40 hover:text-gold-500 transition-colors" aria-label="Edit link">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-white/40 hover:text-red-400 transition-colors" aria-label="Delete link">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}