import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './BLL/redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import CookieConsentProvider from './components/cookie-consent/CookieConsentProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CookieConsentProvider>
          <App />
        </CookieConsentProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
