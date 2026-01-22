import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './component/context/AuthContext.jsx'
import { ThemeProvider } from './component/context/ThemeContext.jsx'
import { LanguageProvider } from './component/context/LanguageContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
