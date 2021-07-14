import * as React from "react"
import {
  ChakraProvider,
  Heading,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel
 } from "@chakra-ui/react"

const IndexPage = () => {
  const [email, setEmail] = React.useState('')

  const onEmailChange = React.useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const onSubscribe = React.useCallback((event) => {
    event.preventDefault();

    fetch('/api/waiting-list', {
      method: 'POST',
      body: JSON.stringify({ 
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => res.json())
    .then(console.log)
    .catch(console.log)
  }, [email])

  return (
    <ChakraProvider>
      <Flex direction="column" px='64px' bgColor='gray.300' width="100%" height="100vh">
        <title>Home Page</title>
        <Heading>
          Here will be my CV — written with Gatsby and Chackra UI!
          <span role="img" aria-label="Party popper emojis">
            🎉🎉🎉
          </span>
        </Heading>
        <Flex as="form" onSubmit={onSubscribe} align='flex-end'>
          <FormControl id="email" maxW='50%' mr='8px' isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={onEmailChange}/>
          </FormControl>
          <Button type="submit">Subscribe</Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default IndexPage
