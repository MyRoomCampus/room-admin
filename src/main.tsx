import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import { BrowserRouter } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
