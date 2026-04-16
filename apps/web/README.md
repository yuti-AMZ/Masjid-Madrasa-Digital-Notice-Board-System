# Masjid/Madrasa Digital Notice Board (Web)

This is the **user-facing** web UI for announcements, Quran/Kitāb programs, and Hijri-based reminders for **Nejashi Mesjid Koye Feche (Addis Ababa, Ethiopia)**.

## Features

- **Announcements**
  - **List**: filter by category + search
  - **Detail page**: richer layout + program/event information
- **Madrasa (Quran & Kitāb program)**
  - **Kitāb tracks**: selectable list with a per‑Kitāb detail page
  - **Register Now**: opens a registration form (stored locally)
- **Hijri calendar + reminders**
  - Hijri month grid (Umm al‑Qura) with marked:
    - **Ayyām al‑Bīḍ** (13/14/15) + fasting reminder
    - **Day of Arafah** (Dhul Hijjah 9)
    - **Eid** (Eid al‑Fitr / Eid al‑Adha)
  - “Upcoming reminder” banner appears on the announcements page
  - Calendar is a separate page: `/calendar`
- **Language toggle**
  - Global **EN / AR** switch in sidebar
  - Persists in localStorage and sets page direction (LTR/RTL)
- **Add to Calendar**
  - Downloads an `.ics` file for non‑madrasa announcements

## Tech stack

- **React** + **Vite**
- **react-router-dom** for routing
- Styling via **design tokens** in `src/App.css` (light/dark via `prefers-color-scheme`)

## Routes

- **`/`**: Announcements list
- **`/announcement/:announcementId`**: Announcement detail
- **`/announcement/:announcementId/kitaab/:kitabIndex`**: Kitāb detail
- **`/announcement/:announcementId/register`**: Quran registration form
- **`/calendar`**: Hijri calendar + reminders

## Key modules / where to edit

- **Announcements data**: `src/data/announcementsData.js`
- **Hijri calendar logic**: `src/data/hijriCalendar.js`
  - Uses `Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', ...)`
  - Reminder rules:
    - Ayyām al‑Bīḍ: day 13/14/15 (every Hijri month)
    - Arafah: Dhul Hijjah (month 12) day 9
    - Eid al‑Fitr: Shawwal (month 10) day 1
    - Eid al‑Adha: Dhul Hijjah (month 12) day 10
- **Calendar UI**: `src/components/CalendarBento.js`
- **Registration form**: `src/pages/QuranRegistrationForm.js`
- **Language/i18n**:
  - Strings: `src/i18n/strings.js`
  - Provider + persistence: `src/i18n/I18nProvider.js`

## localStorage keys

- **Language**: `nejashi_lang` (`en` | `ar`)
- **Saved khutbah reminders**: `nejashi_reminders`
- **Quran registrations**: `nejashi_quran_registrations`

## Design system (tokens)

Defined in `src/App.css`:

- **Primary Action**: `#14C38E`
- **Alert/Accent**: `#FFD700`
- **Light theme**: `#F8F9FA` background, `#FFFFFF` surface, `#1A1A1A` text
- **Dark theme**: `#111D18` background, `#1A2821` surface, `#FFFFFF` text
- **Radius**: 16px cards, 12px buttons

## Running locally

From `Masjid-Madrasa-Digital-Notice-Board-System/apps/web`:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Notes / limitations (current)

- There is **no backend** yet. Registrations and reminders are stored in **localStorage**.
- Calendar reminders are **rule-based** (Hijri rules above). If you need organization-specific dates or content, add a backend/admin UI later.
