import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { announcementsById } from '../data/announcementsData';

const STORAGE_KEY = 'nejashi_quran_registrations';

function saveRegistration(payload) {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...current].slice(0, 200)));
}

function QuranRegistrationForm() {
  const navigate = useNavigate();
  const { announcementId } = useParams();
  const [searchParams] = useSearchParams();

  const announcement = announcementsById[announcementId] || announcementsById['winter-quran-registration'];
  const selectedKitabIndex = Number.parseInt(searchParams.get('kitab') || '0', 10);

  const trackOptions = useMemo(() => {
    const tracks = announcement?.kitaabs?.map((k) => k.name) || [];
    return tracks;
  }, [announcement]);

  const selectedKitab = announcement?.kitaabs?.[selectedKitabIndex] || announcement?.kitaabs?.[0] || null;

  const [form, setForm] = useState({
    name: '',
    telegram: '',
    department: '',
    year: '',
    kitab: trackOptions[0] || '',
    notes: '',
  });

  useEffect(() => {
    setForm((current) => ({
      ...current,
      kitab: selectedKitab?.name || trackOptions[0] || '',
    }));
  }, [selectedKitab, trackOptions]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.telegram.trim()) return 'Telegram username is required.';
    if (!form.department.trim()) return 'Department is required.';
    if (!form.year.trim()) return 'Year is required.';
    if (!form.kitab.trim()) return 'Please select which Kitāb you are registering for.';
    return '';
  };

  const submit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');

    const payload = {
      id: `${announcement.id}-${Date.now()}`,
      announcementId: announcement.id,
      createdAt: new Date().toISOString(),
      ...form,
    };

    saveRegistration(payload);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyRegistration = async () => {
    const text = [
      `Program: ${announcement.title}`,
      `Name: ${form.name}`,
      `Telegram: ${form.telegram.startsWith('@') ? form.telegram : `@${form.telegram}`}`,
      `Department: ${form.department}`,
      `Year: ${form.year}`,
      `Kitāb: ${form.kitab}`,
      `Notes: ${form.notes || '-'}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard.');
    } catch {
      alert(text);
    }
  };

  if (!announcement || announcement.type !== 'madrasa') {
    return (
      <div style={{ width: '100%', maxWidth: '980px', margin: '0 auto', padding: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>Registration</h1>
        <p style={{ margin: '10px 0 0', color: 'var(--color-muted)', lineHeight: 1.8 }}>
          This registration form is only available for Madrasa announcements.
        </p>
        <div style={{ marginTop: '18px' }}>
          <Link to="/announcements" style={{ textDecoration: 'none' }}>
            <button className="btn" style={{ backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 16px', cursor: 'pointer' }}>
              ← Back
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '980px', margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <div>
          <p style={{ margin: 0, color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase', fontSize: '12px' }}>
            Nejashi Mesjid Koye Feche
          </p>
          <h1 style={{ margin: '10px 0 0', fontSize: '34px' }}>Join Madrasa Class</h1>
          <p style={{ margin: '10px 0 0', color: 'var(--color-muted)', lineHeight: 1.8 }}>
            Fill the form below. We will contact you after submission.
          </p>
        </div>
        <Link to="/madrasa" style={{ textDecoration: 'none' }}>
          <button className="btn" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderRadius: '12px', padding: '12px 16px', cursor: 'pointer' }}>
            ← Back to classes
          </button>
        </Link>
      </div>

      {selectedKitab && (
        <div className="card" style={{ padding: '18px', marginBottom: '16px', display: 'grid', gridTemplateColumns: '1.1fr 220px', gap: '16px', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, color: '#FFD700', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '12px' }}>
              Selected Class
            </p>
            <h2 style={{ margin: '8px 0 0', fontSize: '24px', color: 'var(--color-text)' }}>{selectedKitab.name}</h2>
            <p style={{ margin: '10px 0 0', color: 'var(--color-muted)', lineHeight: 1.7 }}>{selectedKitab.description}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
              <span style={{ padding: '8px 12px', borderRadius: '999px', background: 'rgba(20, 195, 142, 0.12)', color: 'var(--color-primary)', fontWeight: 700, fontSize: '13px' }}>
                {selectedKitab.teacher}
              </span>
              <span style={{ padding: '8px 12px', borderRadius: '999px', background: 'rgba(255, 215, 0, 0.18)', color: '#7A5E00', fontWeight: 700, fontSize: '13px' }}>
                {selectedKitab.classTime}
              </span>
            </div>
          </div>
          <img
            src={selectedKitab.image}
            alt={selectedKitab.name}
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--color-border)' }}
          />
        </div>
      )}

      {submitted && (
        <div className="card" style={{ padding: '16px', marginBottom: '16px', borderColor: 'rgba(20, 195, 142, 0.35)', background: 'rgba(20, 195, 142, 0.10)' }}>
          <p style={{ margin: 0, fontWeight: 900 }}>Submitted successfully</p>
          <p style={{ margin: '8px 0 0', color: 'var(--color-muted)', lineHeight: 1.7 }}>
            Your registration has been saved. You can copy the details and send them on Telegram.
          </p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn" onClick={copyRegistration} style={{ border: 'none', background: 'var(--color-primary)', color: '#fff', borderRadius: '12px', padding: '12px 16px', cursor: 'pointer' }}>
              Copy details
            </button>
            <button className="btn" onClick={() => navigate('/announcements')} style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', borderRadius: '12px', padding: '12px 16px', cursor: 'pointer' }}>
              Go to announcements
            </button>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="card" style={{ padding: '18px' }}>
        {error && (
          <div style={{ marginBottom: '12px', borderRadius: '12px', padding: '10px 12px', border: '1px solid rgba(255, 215, 0, 0.65)', background: 'rgba(255, 215, 0, 0.16)' }}>
            <p style={{ margin: 0, fontWeight: 800 }}>{error}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>Name *</label>
            <input value={form.name} onChange={update('name')} style={{ width: '100%', padding: '12px 12px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>Telegram username *</label>
            <input placeholder="@username" value={form.telegram} onChange={update('telegram')} style={{ width: '100%', padding: '12px 12px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>Department *</label>
            <input value={form.department} onChange={update('department')} style={{ width: '100%', padding: '12px 12px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>Year *</label>
            <select value={form.year} onChange={update('year')} style={{ width: '100%', padding: '12px 12px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}>
              <option value="">Select year</option>
              <option value="1st year">1st year</option>
              <option value="2nd year">2nd year</option>
              <option value="3rd year">3rd year</option>
              <option value="4th year">4th year</option>
              <option value="5th year">5th year</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>Which Kitāb are you registering for? *</label>
            <select value={form.kitab} onChange={update('kitab')} style={{ width: '100%', padding: '12px 12px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}>
              {trackOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px' }}>Notes</label>
            <textarea value={form.notes} onChange={update('notes')} rows={4} style={{ width: '100%', padding: '12px 12px', borderRadius: '12px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', resize: 'vertical' }} />
          </div>
        </div>

        <div style={{ marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="submit" className="btn" style={{ border: 'none', background: 'var(--color-primary)', color: '#fff', borderRadius: '12px', padding: '12px 18px', cursor: 'pointer' }}>
            Submit registration
          </button>
          <button type="button" className="btn" onClick={copyRegistration} style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', borderRadius: '12px', padding: '12px 18px', cursor: 'pointer' }}>
            Copy details instead
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuranRegistrationForm;
