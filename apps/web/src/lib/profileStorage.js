/**
 * Extended profile fields (demo localStorage), scoped by signed-in email.
 */
import { getSession } from './authStorage'

const LEGACY_KEY = 'nejashi_web_profile'

const DEFAULTS = {
  phone: '',
  location: '',
  bio: '',
  avatarDataUrl: '',
  language: 'English (United Kingdom)',
  membership: 'premium',
}

function storageKey() {
  const s = getSession()
  if (!s?.email) return 'nejashi_web_profile_v1__'
  return `nejashi_web_profile_v1_${s.email.toLowerCase()}`
}

function readRaw() {
  try {
    const k = storageKey()
    let raw = localStorage.getItem(k)
    if (!raw && k !== LEGACY_KEY) {
      raw = localStorage.getItem(LEGACY_KEY)
      if (raw) {
        localStorage.setItem(k, raw)
        localStorage.removeItem(LEGACY_KEY)
      }
    }
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function getProfileExtras() {
  return { ...DEFAULTS, ...readRaw() }
}

export function saveProfileExtras(partial) {
  const next = { ...readRaw(), ...partial }
  localStorage.setItem(storageKey(), JSON.stringify(next))
  return next
}

export function clearProfileExtras() {
  localStorage.removeItem(storageKey())
}

/** Session + extras for UI. */
export function getMergedProfile() {
  const session = getSession()
  const extras = getProfileExtras()
  return {
    email: session?.email ?? '',
    fullName: session?.fullName ?? '',
    phone: extras.phone,
    location: extras.location,
    bio: extras.bio,
    avatarDataUrl: extras.avatarDataUrl,
    language: extras.language,
    membership: extras.membership,
  }
}
