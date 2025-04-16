import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {ChakraProvider} from '@chakra-ui/react'
import theme from './theme/theme.js'
import { AuthProvider } from "./contexts/AuthContext";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider>
        <App />
     </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
)