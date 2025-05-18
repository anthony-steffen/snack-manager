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
      50: '#e1fce6',
      100: '#b5f5c3',
      200: '#87ee9d',
      300: '#58e777',
      400: '#2adf51',
      500: '#10c637',
      600: '#08a02c',
      700: '#027a21',
      800: '#005416',
      900: '#002f0a',
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
        _dark: 'brand.400',
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
          _active: {
            bg: 'brand.700',
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
      '@keyframes glowing': {
        '0%': { backgroundPosition: '0 0' },
        '50%': { backgroundPosition: '400% 0' },
        '100%': { backgroundPosition: '0 0' },
      },
    },
  },
})

export default theme
