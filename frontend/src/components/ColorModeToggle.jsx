// src/components/ColorModeToggle.jsx
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { IoMdMoon, IoMdSunny} from "react-icons/io";

export default function ColorModeToggle() {
  const { toggleColorMode } = useColorMode()
  const icon = useColorModeValue(<IoMdMoon />, <IoMdSunny />)
  const iconColor = useColorModeValue('blue.700', 'yellow.400')
  // const icon = useColorModeValue('🌙', '☀️')
  const label = useColorModeValue('dark', 'light')

  return (
    <IconButton
      aria-label={label}
      icon={icon}
      onClick={toggleColorMode}
      color={iconColor}
      outline='ghost'
      bg={useColorModeValue('white', '#242424')}
      position="absolute"
      top="2"
      right="4"
      size="sm"
      _hover={{
        color: iconColor,
      }}
      transition="color 0.2s ease-in-out"
      fontSize="2xl"
      fontWeight="bold"
      boxShadow={'none'}
    />
  )
}
