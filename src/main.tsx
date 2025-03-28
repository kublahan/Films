import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import FilmService from './services/FilmService.tsx'
import { BrowserRouter } from 'react-router-dom';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
  
)
