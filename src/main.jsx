import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { PodcastApp } from './PodcastApp'
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PodcastApp />
    </BrowserRouter>
  </StrictMode>,
)
