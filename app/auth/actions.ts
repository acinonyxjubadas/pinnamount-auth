'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

// ============================================
// VALIDATION SCHEMAS
// ============================================

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().optional(),
})

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().optional(),
})

// ============================================
// HELPER FUNCTION - Safe Zod Error Handling
// ============================================

function getZodErrorMessage(error: unknown): string {
  // Check if it's a ZodError using the safe method
  if (error && typeof error === 'object' && 'issues' in error) {
    const zodError = error as z.ZodError
    return zodError.issues[0]?.message || 'Invalid input data'
  }
  
  // Check for the older format
  if (error && typeof error === 'object' && 'errors' in error) {
    const zodError = error as any
    return zodError.errors[0]?.message || 'Invalid input data'
  }
  
  return 'Invalid input data'
}

// ============================================
// SIGN UP
// ============================================

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string

  // Validate input
  try {
    signUpSchema.parse({ email, password, fullName, phone })
  } catch (error) {
    const errorMessage = getZodErrorMessage(error)
    return redirect(
      `/auth/signup?error=${encodeURIComponent(errorMessage)}`
    )
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone || '',
        role: 'affiliate',
        tier: 'Bronze',
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return redirect(
      `/auth/signup?error=${encodeURIComponent(error.message)}`
    )
  }

  return redirect('/auth/verify-email')
}

// ============================================
// SIGN IN
// ============================================

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validate input
  try {
    signInSchema.parse({ email, password })
  } catch (error) {
    const errorMessage = getZodErrorMessage(error)
    return redirect(
      `/auth/signin?error=${encodeURIComponent(errorMessage)}`
    )
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Handle specific error cases for better user experience
    let errorMessage = error.message
    if (error.message.includes('Invalid login credentials')) {
      errorMessage = 'Invalid email or password. Please try again.'
    } else if (error.message.includes('Email not confirmed')) {
      errorMessage = 'Please verify your email before signing in.'
    }
    return redirect(
      `/auth/signin?error=${encodeURIComponent(errorMessage)}`
    )
  }

  revalidatePath('/', 'layout')
  return redirect('/dashboard')
}

// ============================================
// SIGN OUT
// ============================================

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  return redirect('/')
}

// ============================================
// DELETE ACCOUNT
// ============================================

export async function deleteAccount() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/signin')
  }

  try {
    // Sign out the user after deletion
    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    return redirect('/?deleted=true')
  } catch (error) {
    return redirect(
      `/profile?error=${encodeURIComponent('Failed to delete account. Please contact support.')}`
    )
  }
}

// ============================================
// UPDATE PROFILE
// ============================================

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/auth/signin')
  }

  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string

  // Validate input
  try {
    updateProfileSchema.parse({ fullName, phone })
  } catch (error) {
    const errorMessage = getZodErrorMessage(error)
    return redirect(
      `/profile?error=${encodeURIComponent(errorMessage)}`
    )
  }

  // Update auth metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      phone: phone || '',
    },
  })

  if (authError) {
    return redirect(
      `/profile?error=${encodeURIComponent(authError.message)}`
    )
  }

  revalidatePath('/profile')
  revalidatePath('/dashboard')
  return redirect('/profile?success=Profile updated successfully')
}

// ============================================
// RESET PASSWORD
// ============================================

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  if (!email) {
    return redirect(
      `/auth/reset-password?error=${encodeURIComponent('Email is required')}`
    )
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
  })

  if (error) {
    return redirect(
      `/auth/reset-password?error=${encodeURIComponent(error.message)}`
    )
  }

  return redirect('/auth/check-email')
}

// ============================================
// UPDATE PASSWORD
// ============================================

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string

  if (!password || password.length < 8) {
    return redirect(
      `/auth/update-password?error=${encodeURIComponent('Password must be at least 8 characters')}`
    )
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return redirect(
      `/auth/update-password?error=${encodeURIComponent(error.message)}`
    )
  }

  revalidatePath('/', 'layout')
  return redirect('/auth/signin?success=Password updated successfully')
}

// ============================================
// SEND VERIFICATION EMAIL
// ============================================

export async function resendVerificationEmail(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  if (!email) {
    return redirect(
      `/auth/verify-email?error=${encodeURIComponent('Email is required')}`
    )
  }

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return redirect(
      `/auth/verify-email?error=${encodeURIComponent(error.message)}`
    )
  }

  return redirect('/auth/verify-email?success=Verification email resent')
}