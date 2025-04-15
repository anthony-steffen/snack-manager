// src/theme/theme.js
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    heading: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  colors: {
    brand: {
      50: '#ffe0f0',
      100: '#ffb3d9',
      200: '#ff80c1',
      300: '#ff4da8',
      400: '#ff1a90',
      500: '#e60073', // rosa vibrante
      600: '#b30059',
      700: '#800040',
      800: '#4d0026',
      900: '#1a000d',
    },
    dark: {
      bg: '#242424',
      text: '#ffffffde',
    },
    light: {
      bg: '#ffffff',
      text: '#213547',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#242424' : '#ffffff',
        color: props.colorMode === 'dark' ? '#ffffffde' : '#213547',
        fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
      },
      '::selection': {
        backgroundColor: '#ff80c1',
        color: '#fff',
      },
    }),
  },
  components: { 
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: '8px',
      },
      variants: {
        solid: {
          bgGradient: 'linear(to-r, #ff0080, #8400a5, #053bdd)',
          color: 'white',
          _hover: {
            bgGradient: 'linear(to-r, #ff0080, #8400a5, #053bdd)',
            boxShadow: 'xl',
          },
          _active: {
            bg: 'blackAlpha.300',
            boxShadow: 'xl',
          },
          _focus: {
            outline: 'none',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        borderColor: 'gray.400',
      },
    },
  },
})

export default theme
