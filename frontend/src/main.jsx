import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ChakraProvider} from '@chakra-ui/react'
import theme from './theme/theme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
        <App />
    </ChakraProvider>
  </StrictMode>,
)