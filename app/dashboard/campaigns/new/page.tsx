'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { 
  LinkIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HashtagIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function NewCampaignPage() {
  const [campaignName, setCampaignName] = useState('')
  const [source, setSource] = useState('')
  const [medium, setMedium] = useState('')
  const [campaignId, setCampaignId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate campaign name
    if (!campaignName.trim()) {
      setError('Campaign name is required')
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate unique link
    const slug = campaignName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const uniqueId = Math.random().toString(36).substring(2, 8)
    const link = `https://pinnamount.com/r/${slug}-${uniqueId}`

    setGeneratedLink(link)
    setShowSuccess(true)
    setIsSubmitting(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
    alert('Link copied to clipboard!')
  }

  const resetForm = () => {
    setCampaignName('')
    setSource('')
    setMedium('')
    setCampaignId('')
    setShowSuccess(false)
    setGeneratedLink('')
    setError(null)
  }

  if (showSuccess) {
    return (
      <DashboardLayout 
        title="Campaign Created!"
        subtitle="Your referral link is ready to share"
        backHref="/dashboard/links"
      >
        <div className="glass rounded-2xl p-8 border border-gold-500/20 text-center">
          <div className="w-20 h-20 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-10 h-10 text-gold-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-white font-display mb-2">🎉 Campaign Created!</h2>
          <p className="text-white/50 text-sm mb-6">Your referral link is ready to share with your audience</p>

          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-white/40 text-xs font-inter uppercase tracking-wider mb-2">Your Referral Link</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="btn-gold px-6 py-2 w-auto text-sm"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://twitter.com/intent/tweet?text=Check out this amazing offer from Pinnamount Escapes!&url=${encodeURIComponent(generatedLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-6 py-2 w-auto text-sm"
            >
              🐦 Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-6 py-2 w-auto text-sm"
            >
              📘 Share on Facebook
            </a>
            <button
              onClick={resetForm}
              className="btn-gold px-6 py-2 w-auto text-sm"
            >
              Create Another
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Create Campaign"
      subtitle="Generate a new referral link"
      backHref="/dashboard/links"
    >
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
          <span className="text-red-300 text-sm">{error}</span>
        </div>
      )}

      <div className="glass rounded-2xl p-8 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campaign Name */}
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Campaign Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                <HashtagIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="input-field pl-10"
                placeholder="e.g., Summer Special 2024"
                required
              />
            </div>
            <p className="text-white/30 text-xs mt-1">
              This will be used to create your unique referral link
            </p>
          </div>

          {/* Source */}
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Source <span className="text-white/30 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                <GlobeAltIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="input-field pl-10"
                placeholder="e.g., Instagram, Facebook, Email"
              />
            </div>
            <p className="text-white/30 text-xs mt-1">
              Where will you share this link? Helps track performance
            </p>
          </div>

          {/* Medium */}
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Medium <span className="text-white/30 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                <UserGroupIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="input-field pl-10"
                placeholder="e.g., CPC, Email, Social"
              />
            </div>
            <p className="text-white/30 text-xs mt-1">
              Marketing medium for tracking purposes
            </p>
          </div>

          {/* Campaign ID */}
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Campaign ID <span className="text-white/30 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="input-field pl-10"
                placeholder="e.g., SUMMER2024"
              />
            </div>
            <p className="text-white/30 text-xs mt-1">
              Custom identifier for your campaign
            </p>
          </div>

          {/* Generated Link Preview */}
          {campaignName && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-white/40 text-xs font-inter uppercase tracking-wider mb-2">Preview Link</p>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-gold-500" />
                <span className="text-white/60 text-sm truncate">
                  https://pinnamount.com/r/{campaignName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-xxxxxx
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner-navy inline-block" />
                Generating Link...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <SparklesIcon className="w-5 h-5" />
                Generate Referral Link
              </span>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/5">
          <p className="text-white/30 text-xs text-center font-inter">
            🔒 Your referral link will be unique to this campaign. 
            Track performance in your dashboard.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}