'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { 
  BellIcon,
  Cog6ToothIcon,
  UserIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function DashboardSettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    commissionAlerts: true,
    payoutAlerts: true,
  })

  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'Africa/Nairobi',
    currency: 'USD',
  })

  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSaveSettings = async () => {
    setSaving(true)
    setSaveMessage(null)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSaveMessage({ type: 'success', text: 'Settings saved successfully!' })
    setSaving(false)
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => setSaveMessage(null), 3000)
  }

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <DashboardLayout 
      title="Settings"
      subtitle="Manage your account preferences"
      backHref="/dashboard"
    >
      {/* Save Message */}
      {saveMessage && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          saveMessage.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/30 text-green-300'
            : 'bg-red-500/10 border border-red-500/30 text-red-300'
        }`}>
          {saveMessage.type === 'success' ? (
            <CheckCircleIcon className="w-5 h-5" />
          ) : (
            <ExclamationTriangleIcon className="w-5 h-5" />
          )}
          <span className="text-sm">{saveMessage.text}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Notifications Section */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500">
              <BellIcon className="w-5 h-5" />
            </div>
            <h3 className="text-white font-semibold font-inter">Notifications</h3>
          </div>
          <p className="text-white/40 text-sm mb-4">Manage how you receive notifications</p>
          
          <div className="space-y-3">
            <ToggleSwitch
              label="Email Notifications"
              description="Receive notifications via email"
              checked={notifications.email}
              onChange={() => handleToggle('email')}
            />
            <ToggleSwitch
              label="Push Notifications"
              description="Receive push notifications in browser"
              checked={notifications.push}
              onChange={() => handleToggle('push')}
            />
            <ToggleSwitch
              label="Commission Alerts"
              description="Get notified when you earn a commission"
              checked={notifications.commissionAlerts}
              onChange={() => handleToggle('commissionAlerts')}
            />
            <ToggleSwitch
              label="Payout Alerts"
              description="Get notified when a payout is processed"
              checked={notifications.payoutAlerts}
              onChange={() => handleToggle('payoutAlerts')}
            />
          </div>
        </div>

        {/* Preferences Section */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Cog6ToothIcon className="w-5 h-5" />
            </div>
            <h3 className="text-white font-semibold font-inter">Preferences</h3>
          </div>
          <p className="text-white/40 text-sm mb-4">Customize your experience</p>
          
          <div className="space-y-4">
            <SelectField
              label="Language"
              value={preferences.language}
              options={['English', 'Spanish', 'French', 'Swahili']}
              onChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
            />
            <SelectField
              label="Timezone"
              value={preferences.timezone}
              options={['Africa/Nairobi', 'Africa/Johannesburg', 'America/New_York', 'Europe/London']}
              onChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}
            />
            <SelectField
              label="Currency"
              value={preferences.currency}
              options={['USD', 'KES', 'EUR', 'GBP']}
              onChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}
            />
          </div>
        </div>

        {/* Security Section */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <h3 className="text-white font-semibold font-inter">Security</h3>
          </div>
          <p className="text-white/40 text-sm mb-4">Manage your security settings</p>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-white/40" />
                <div className="text-left">
                  <p className="text-white text-sm font-medium">Change Password</p>
                  <p className="text-white/30 text-xs">Update your account password</p>
                </div>
              </div>
              <span className="text-white/30 text-sm">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <GlobeAltIcon className="w-5 h-5 text-white/40" />
                <div className="text-left">
                  <p className="text-white text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-white/30 text-xs">Add an extra layer of security</p>
                </div>
              </div>
              <span className="text-white/30 text-sm">→</span>
            </button>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
              <CreditCardIcon className="w-5 h-5" />
            </div>
            <h3 className="text-white font-semibold font-inter">Payment Methods</h3>
          </div>
          <p className="text-white/40 text-sm mb-4">Manage your payout methods</p>
          
          <div className="space-y-3">
            <PaymentMethod
              icon="📱"
              name="M-Pesa"
              details="+254 700 000 000"
              status="Verified"
            />
            <PaymentMethod
              icon="🏦"
              name="Bank Transfer"
              details="****7890 - Equity Bank"
              status="Pending"
            />
            <button className="w-full p-4 rounded-lg border-2 border-dashed border-white/10 hover:border-gold-500/50 transition-colors text-white/40 text-sm hover:text-gold-400">
              + Add Payment Method
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="btn-gold w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <span className="spinner-navy inline-block" />
              Saving Changes...
            </span>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>
    </DashboardLayout>
  )
}

// ============================================
// COMPONENTS
// ============================================

interface ToggleSwitchProps {
  label: string
  description: string
  checked: boolean
  onChange: () => void
}

function ToggleSwitch({ label, description, checked, onChange }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-white/30 text-xs">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-gold-500' : 'bg-white/20'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  )
}

interface SelectFieldProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-white/60 text-sm font-medium mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-navy-900">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

interface PaymentMethodProps {
  icon: string
  name: string
  details: string
  status: string
}

function PaymentMethod({ icon, name, details, status }: PaymentMethodProps) {
  const statusColors = {
    Verified: 'text-green-400 bg-green-500/10',
    Pending: 'text-yellow-400 bg-yellow-500/10',
    Failed: 'text-red-400 bg-red-500/10',
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-white text-sm font-medium">{name}</p>
          <p className="text-white/40 text-xs">{details}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || 'bg-white/5 text-white/40'}`}>
        {status}
      </span>
    </div>
  )
}