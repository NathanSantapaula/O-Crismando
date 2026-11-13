// tema salvo antes de desenhar, para não piscar
try { if (localStorage.getItem('tema') === 'claro') document.documentElement.dataset.tema = 'claro' } catch {}
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
// sem cache offline: remove qualquer service worker antigo para o celular sempre abrir a versão nova
if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => { r.update(); r.unregister() }))
if (window.caches) caches.keys().then(ks => ks.forEach(k => caches.delete(k)))
