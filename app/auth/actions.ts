'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// ============================================
// SIGN UP
// ============================================
export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
        role: 'guest',
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)
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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/auth/signin?error=${encodeURIComponent(error.message)}`)
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

  // Delete user data from your database first
  await supabase.from('profiles').delete().eq('id', user.id)
  await supabase.from('bookings').delete().eq('guest_id', user.id)
  await supabase.from('wishlists').delete().eq('guest_id', user.id)

  // Sign out the user (admin delete requires service role key — this signs them out)
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  return redirect('/?deleted=true')
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

  // Update auth metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      phone: phone,
    },
  })

  if (authError) {
    return redirect(`/profile?error=${encodeURIComponent(authError.message)}`)
  }

  revalidatePath('/profile')
  return redirect('/profile?success=Profile updated successfully')
}
