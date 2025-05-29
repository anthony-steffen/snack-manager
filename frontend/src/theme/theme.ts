import { border, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { color } from 'framer-motion'

// ⚙️ Configuração inicial
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 🎨 Tema personalizado com botão `glow`
const theme = extendTheme({
  config,
  fonts: {
    heading: `'Outfit', sans-serif`,
    body: `'Outfit', sans-serif`,
  },
  radii: {
    l1: '0.25rem',
    l2: '0.375rem',
    l3: '0.5rem',
  },
  colors: {
    brand: {
      // //Paleta verde
      // 50: '#e1fce6',
      // 100: '#b5f5c3',
      // 200: '#87ee9d',
      // 300: '#58e777',
      // 400: '#2adf51',
      // 500: '#10c637',
      // 600: '#08a02c',
      // 700: '#027a21',
      // 800: '#005416',
      // 900: '#002f0a',

      // Paleta azul
      50: '#e1f4fc',
      100: '#b5e8fc',
      200: '#87dcfa',
      300: '#58d0f8',
      400: '#2ac4f6',
      500: '#10b8f4',
      600: '#08a0e0',
      700: '#0288cc',
      800: '#0070b8',
      900: '#00569c',

      // //Paleta Vermelha
      // 50: '#fce1e1',
      // 100: '#fcb5b5',
      // 200: '#fa8787',
      // 300: '#f87758',
      // 400: '#f6512a',
      // 500: '#f43710',
      // 600: '#e00808',
      // 700: '#cc0202',
      // 800: '#b80202',
      // 900: '#9c0000',

      // //Paleta Amarela
      // 50: '#fcfce1',
      // 100: '#f8fcb5',
      // 200: '#f4fa87',
      // 300: '#f0f858',
      // 400: '#ecf52a',
      // 500: '#e8f410',
      // 600: '#d8e008',
      // 700: '#c0cc02',
      // 800: '#a8b802',
      // 900: '#9c9c00',
      
      // //Paleta Roxa
      // 50: '#fce1fc',
      // 100: '#fcb5f8',
      // 200: '#fa87fa',
      // 300: '#f858f8',
      // 400: '#f52af6',
      // 500: '#f410f4',
      // 600: '#e008e0',
      // 700: '#cc02cc',
      // 800: '#b802b8',
      // 900: '#9c009c',
      
    },
  },
  semanticTokens: {
    colors: {
      bg: {
        default: 'gray.50',
        _dark: 'gray.900',
      },
      text: {
        default: 'gray.800',
        _dark: 'gray.100',
      },
      primary: {
        default: 'brand.500',
        _dark: 'brand.300',
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brand.800',
          color: 'white',
          border: '1px solid',
          borderColor: 'gray.900',
          rounded: 'lg',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
          _dark: {
            color: 'brand.400',
            borderColor: 'brand.400',
            _hover: {
              bg: 'whiteAlpha.100',
            },
          },
        },
        glow: {
          position: 'relative',
          zIndex: 0,
          borderRadius: 'lg',
          px: 6,
          py: 3,
          fontWeight: 'bold',
          bg: '#111',
          color: 'white',
          transition: 'all 0.3s ease',
          _before: {
            content: `''`,
            position: 'absolute',
            width: 'calc(100% + 2px)',
            height: 'calc(100% + 2px)',
            bgGradient:
              'linear(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)',
            bgSize: '400%',
            filter: 'blur(3px)',
            borderRadius: 'lg',
            zIndex: -1,
            opacity: 0,
            transition: 'opacity 0.4s ease-in-out',
            animation: 'glowing 20s linear infinite',
          },
          _after: {
            content: `''`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bg: '#111',
            borderRadius: 'lg',
            zIndex: -1,
          },
          _hover: {
            _before: {
              opacity: 1,
            },
          },
          _focus: {
            boxShadow: 'none !important',
            outline: 'none !important',
          },
          _focusVisible: {
            boxShadow: 'none !important',
            outline: 'none !important',
          },
          _active: {
            boxShadow: 'none !important',
            outline: 'none !important',
            color: 'white',
          },
        }
               
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
           _light: {
            borderColor: 'blackAlpha.900',
            _placeholder: {
              color: 'blackAlpha.900',
            },
            _focus: {
              borderColor: 'orange.400',
              borderWidth: '2px',
            },
            _hover: {
              borderColor: 'orange.400',
              borderWidth: '2px',
            },
          },
            _dark: {
              borderColor: 'gray.400',
              _placeholder: {
                color: 'gray.400',
              },
              _focus: {
                borderColor: 'orange.400',
                borderWidth: '2px',
              },
              _hover: {
                borderColor: 'orange.400',
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'bg',
        color: 'text',
      },
      button: {
        outline: 'none !important',
        boxShadow: 'none !important',
        maxWidth: '150px',
        mx: 'auto',
        my: '4px',
      },
      '*:focus': {
        outline: 'none !important',
        boxShadow: 'none !important',
      },
      '*:focus-visible': {
        outline: 'none !important',
        boxShadow: 'none !important',
      },
      '@keyframes glowing': {
        '0%': { backgroundPosition: '0 0' },
        '50%': { backgroundPosition: '400% 0' },
        '100%': { backgroundPosition: '0 0' },
      },
    },
  },
})

export default theme
