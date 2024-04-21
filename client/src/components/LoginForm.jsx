import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Container,
    Stack,
    Heading,
    Text,
    Link,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
        setShowAlert(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });

            if (data.login.token) {
                // console.log(data.login.token)
                Auth.login(data.login.token);
            }

        } catch (e) {
            // console.error(e);
            setShowAlert(true);
        }
    };

    return (
        <Container maxW="lg" py={{ base: '10', md: '16' }} px={{ base: '0', sm: '8' }} >
            <Stack spacing="8">
                <Stack spacing="6" textAlign="center">
                    <Heading size="lg" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
                        Log in to your account
                    </Heading>
                </Stack>

                <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }} bg="bg.surface" boxShadow="xl" borderRadius="xl">
                    <form onSubmit={handleFormSubmit}>
                        <Stack spacing="6">

                            <FormControl isInvalid={error}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={userFormData.email}
                                    placeholder="Enter your email"
                                    required />
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={error}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={handleInputChange}
                                    value={userFormData.password}
                                    placeholder="Enter your password"
                                    required />
                                <FormErrorMessage>Password is required.</FormErrorMessage>
                            </FormControl>

                            {error && (
                                <Alert status="error">
                                    <AlertIcon />
                                    Login or password is incorrect.
                                </Alert>
                            )}

                            <Button type="submit" colorScheme="blue" mb='5' isDisabled={!userFormData.email || !userFormData.password}>
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container>
    );
};

export default LoginForm;
