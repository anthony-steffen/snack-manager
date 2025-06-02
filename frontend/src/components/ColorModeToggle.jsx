// src/components/ColorModeToggle.jsx
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { IoMdMoon, IoMdSunny} from "react-icons/io";

export default function ColorModeToggle() {
  const { toggleColorMode } = useColorMode()
  const icon = useColorModeValue(<IoMdMoon />, <IoMdSunny />)
  const iconColor = useColorModeValue('gray.900', 'yellow.400')
  // const icon = useColorModeValue('🌙', '☀️')
  const label = useColorModeValue('dark', 'light')

  return (
    <IconButton
      aria-label={label}
      icon={icon}
      onClick={toggleColorMode}
      color={iconColor}
      outline='ghost'
      bgColor='transparent'
      border='none'
      position="absolute"
      top="4"
      right="4"
      size="sm"
      transition="color 0.2s ease-in-out"
      fontSize="2xl"
      fontWeight="bold"
      boxShadow='none'
    />
  )
}
