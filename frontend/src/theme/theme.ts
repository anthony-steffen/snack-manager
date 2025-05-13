import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// ⚙️ Configuração de cor inicial
const config: ThemeConfig = {
  initialColorMode: 'dark', // pode ser 'light' se preferir
  useSystemColorMode: false,
}

// 🎨 Tema personalizado
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
      500: '#10c637', // ✅ cor principal do botão
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
          bg: 'green.500',
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
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'bg',
        color: 'text',
      },
    },
  },
})

export default theme
