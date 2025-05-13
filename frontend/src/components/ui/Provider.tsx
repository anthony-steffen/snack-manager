import React, { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../theme/theme' // ajuste o caminho conforme seu projeto

export const Provider = ({ children }: PropsWithChildren) => (
  <ChakraProvider theme={theme}>
    {children}
  </ChakraProvider>
)
