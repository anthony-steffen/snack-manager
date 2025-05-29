import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Text,
  Select,
  Stack,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ReactElement } from 'react'

interface FilterBtnProps {
  categoryFilter: string
  setCategoryFilter: (value: string) => void
  validityFilter: string
  setValidityFilter: (value: string) => void
  sortDirection: string
  setSortDirection: (value: string) => void
  categories: (string | undefined)[]
}

export const FilterBtn = ({
  categoryFilter,
  setCategoryFilter,
  validityFilter,
  setValidityFilter,
  sortDirection,
  setSortDirection,
  categories,
}: FilterBtnProps): ReactElement => {
  return (
     <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Filtros"
        icon={<GiHamburgerMenu />}
        variant="outline"
        size="sm"
      />
      <MenuList
        p={4}
        minW="240px"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.700"
        bg="bg"
      >
        <Stack spacing={3}>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={1}>
              Categoria
            </Text>
            <Select
              size="sm"
              placeholder="Selecione"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={1}>
              Validade até
            </Text>
            <Select
              size="sm"
              placeholder="Selecione"
              value={validityFilter}
              onChange={(e) => setValidityFilter(e.target.value)}
            >
              <option value="3">3 dias</option>
              <option value="7">7 dias</option>
              <option value="30">30 dias</option>
            </Select>
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={1}>
              Ordenar Preço
            </Text>
            <Select
              size="sm"
              placeholder="Selecione"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="asc">Preço ↑</option>
              <option value="desc">Preço ↓</option>
            </Select>
          </Box>
        </Stack>
      </MenuList>
    </Menu>
  )
}
