import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initWebVitals } from './lib/monitoring'

const BUILD_VERSION = '20260701-portfolio-v5'

document.documentElement.dataset.portfolioBuild = BUILD_VERSION

initWebVitals()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
