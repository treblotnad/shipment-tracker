import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider,
    IconButton,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react'

export default function Footer() {
    return (
        <>
            <Divider mt='200px' />
            <Box bg="bg.surface" >
                <Container as="footer" role="contentinfo">

                    <Stack
                        pt="2"
                        pb="12"
                        justify="center"
                        direction={{ base: 'column-reverse', md: 'row' }}
                        align="center"
                    >
                        <Text fontSize="sm" color="gray.500">
                            &copy; {new Date().getFullYear()} Deliverly. All rights reserved.
                        </Text>
                        <ButtonGroup variant="tertiary" mt={-4}>
                            <a href="https://github.com/treblotnad/shipment-tracker" target="_blank" rel="noopener noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="gray"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.481.5.09.682-.217.682-.48 0-.236-.01-.862-.014-1.693-2.782.604-3.37-1.338-3.37-1.338-.454-1.153-1.11-1.462-1.11-1.462-.906-.618.07-.605.07-.605 1.002.07 1.527 1.03 1.527 1.03.89 1.526 2.34 1.086 2.912.83.09-.646.35-1.086.636-1.336-2.226-.253-4.566-1.113-4.566-4.946 0-1.092.39-1.984 1.029-2.682-.103-.254-.446-1.274.096-2.65 0 0 .84-.269 2.75 1.025a9.57 9.57 0 0 1 2.503-.338c.85.003 1.705.115 2.503.338 1.908-1.294 2.747-1.025 2.747-1.025.545 1.376.2 2.396.098 2.65.64.698 1.025 1.59 1.025 2.682 0 3.84-2.344 4.688-4.577 4.936.36.31.678.92.678 1.852 0 1.336-.012 2.414-.012 2.74 0 .267.18.576.688.478C19.138 20.17 22 16.42 22 12c0-5.523-4.477-10-10-10"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </ButtonGroup>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}