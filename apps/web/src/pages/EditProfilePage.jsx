import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, MapPin, Save, Trash2, Upload, User, Mail, Phone } from 'lucide-react'
import { getSession, updateRegisteredUserFullName, updateSession } from '../lib/authStorage'
import { getMergedProfile, saveProfileExtras } from '../lib/profileStorage'
import './EditProfilePage.css'

const MAX_AVATAR_BYTES = 800 * 1024

export function EditProfilePage() {
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const initial = useMemo(() => getMergedProfile(), [])
  const [fullName, setFullName] = useState(initial.fullName)
  const [email] = useState(initial.email)
  const [phone, setPhone] = useState(initial.phone)
  const [location, setLocation] = useState(initial.location)
  const [bio, setBio] = useState(
    initial.bio || 'Active member of the community. Interested in youth programs and weekend volunteering.',
  )
  const [avatarDataUrl, setAvatarDataUrl] = useState(initial.avatarDataUrl)
  const [saving, setSaving] = useState(false)
  const [avatarError, setAvatarError] = useState('')

  if (!getSession()) {
    navigate('/login', { replace: true })
    return null
  }

  function onPickFile(e) {
    const file = e.target.files?.[0]
    setAvatarError('')
    if (!file) return
    if (!/^image\/(jpeg|png|gif|webp)$/i.test(file.type)) {
      setAvatarError('Please use JPG, PNG, GIF, or WebP.')
      return
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setAvatarError('Image must be 800KB or smaller.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setAvatarDataUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function removePhoto() {
    setAvatarDataUrl('')
    setAvatarError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    const session = getSession()
    if (session) {
      updateRegisteredUserFullName(session.email, fullName)
      updateSession({ fullName: fullName.trim() })
    }
    saveProfileExtras({
      phone: phone.trim(),
      location: location.trim(),
      bio: bio.trim(),
      avatarDataUrl,
    })
    setTimeout(() => {
      setSaving(false)
      navigate('/profile', { replace: true })
    }, 280)
  }

  const initials = (fullName || '?')
    .split(/\s+/)
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="edit-profile">
      <div className="edit-profile__card">
        <header className="edit-profile__head">
          <h1 className="edit-profile__title">Edit profile</h1>
          <p className="edit-profile__sub">Update your personal information and profile picture.</p>
        </header>

        <div className="edit-profile__photo-block">
          <div className="edit-profile__avatar">
            {avatarDataUrl ? (
              <img src={avatarDataUrl} alt="" />
            ) : (
              <span className="edit-profile__avatar-placeholder">{initials}</span>
            )}
          </div>
          <div className="edit-profile__photo-copy">
            <p className="edit-profile__photo-title">Profile photo</p>
            <p className="edit-profile__photo-hint">Recommended: JPG, GIF or PNG. Max size of 800KB.</p>
            {avatarError ? <p className="edit-profile__photo-error">{avatarError}</p> : null}
            <div className="edit-profile__photo-actions">
              <button
                type="button"
                className="edit-profile__btn edit-profile__btn--primary"
                onClick={() => fileRef.current?.click()}
              >
                <Upload size={18} strokeWidth={2} aria-hidden />
                Upload new
              </button>
              <button type="button" className="edit-profile__btn edit-profile__btn--muted" onClick={removePhoto}>
                <Trash2 size={18} strokeWidth={2} aria-hidden />
                Remove
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="edit-profile__file-input"
                onChange={onPickFile}
              />
            </div>
          </div>
        </div>

        <form className="edit-profile__form" onSubmit={handleSave}>
          <div className="edit-profile__fields">
            <label className="edit-profile__field">
              <span className="edit-profile__label">Full name</span>
              <span className="edit-profile__input-wrap">
                <User size={18} className="edit-profile__input-icon" aria-hidden />
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </span>
            </label>
            <label className="edit-profile__field">
              <span className="edit-profile__label">Email address</span>
              <span className="edit-profile__input-wrap edit-profile__input-wrap--disabled">
                <Mail size={18} className="edit-profile__input-icon" aria-hidden />
                <input value={email} readOnly title="Email cannot be changed in the demo" />
              </span>
            </label>
            <label className="edit-profile__field">
              <span className="edit-profile__label">Phone number</span>
              <span className="edit-profile__input-wrap">
                <Phone size={18} className="edit-profile__input-icon" aria-hidden />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 …"
                  autoComplete="tel"
                />
              </span>
            </label>
            <label className="edit-profile__field">
              <span className="edit-profile__label">Location (city)</span>
              <span className="edit-profile__input-wrap">
                <MapPin size={18} className="edit-profile__input-icon" aria-hidden />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Addis Ababa, Ethiopia"
                  autoComplete="address-level2"
                />
              </span>
            </label>
          </div>

          <label className="edit-profile__field edit-profile__field--full">
            <span className="edit-profile__label">Short bio</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="edit-profile__textarea"
            />
          </label>

          <div className="edit-profile__form-actions">
            <Link to="/profile" className="edit-profile__cancel">
              Cancel
            </Link>
            <button type="submit" className="edit-profile__submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="edit-profile__spin" size={20} aria-hidden />
                  Saving…
                </>
              ) : (
                <>
                  <Save size={20} strokeWidth={2} aria-hidden />
                  Save changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
