import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const THEME_STORAGE_KEY = 'noor-masjid-theme'

try {
  if (localStorage.getItem(THEME_STORAGE_KEY) === 'dark') {
    document.documentElement.classList.add('noor-theme-dark')
  }
} catch {
  // Ignore storage access errors and fall back to light theme.
}

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Root element #root not found')
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
