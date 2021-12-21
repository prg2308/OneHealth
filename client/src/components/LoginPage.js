import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Image,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { Select } from '@chakra-ui/select'
import { useColorMode } from '@chakra-ui/color-mode'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  // local state
  const [username, setUsername] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [password, setPassword] = useState('')
  const [accType, setAccType] = useState(null)

  // colors
  const textColor = useColorModeValue('blue.700', 'blue.100')
  const bgColor = useColorModeValue('white', 'gray.700')
  const btnColor = useColorModeValue('yellow.300', 'yellow.400')

  // dark mode toggle button
  const colorMode = window.localStorage.getItem('chakra-ui-color-mode')
  const { toggleColorMode } = useColorMode()
  const ColorModeToggleButton = props => {
    if (colorMode === 'dark') {
      return <SunIcon {...props} onClick={toggleColorMode} />
    } else {
      return <MoonIcon {...props} onClick={toggleColorMode} />
    }
  }

  const navigate = useNavigate()
  const handleSubmit = () => {
    navigate('/dashboard')
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <Stack spacing={7} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Flex align='center' justify='center'>
            <Heading w='fit-content' textAlign='center' color={textColor} fontSize='4xl'>
              Welcome to OneHealth
            </Heading>
            <Image display={['none', 'block']} ml='4' height='50px' width='50px' src='OneHealth-logo.png' />
          </Flex>
          <Text align='center' fontSize='lg' color='gray.500'>
            sign in to get started! <ColorModeToggleButton ml={3} />
          </Text>

        </Stack>
        <Box
          rounded='lg'
          bg={bgColor}
          boxShadow='lg'
          p={8}
        >
          <Stack spacing={3}>
            <FormControl id='accountType'>
              <FormLabel>User type </FormLabel>
              <Select
                onChange={e => setAccType(e.target.value)}
                placeholder='Select option'
              >
                <option value='doctor'>Doctor</option>
                <option value='patient'>Patient</option>
                <option value='admin'>Admin</option>
              </Select>
            </FormControl>
            {accType !== 'admin' && (
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </FormControl>
            )}
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type='password'
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align='start'
                justify='space-between'
              >
                <Checkbox colorScheme='yellow'>Remember me</Checkbox>
                <Link color={textColor}>Sign up instead</Link>
              </Stack>
              <Button onClick={handleSubmit} bgColor={btnColor} colorScheme='yellow'>Sign in</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack >
    </Flex >
  )
}
