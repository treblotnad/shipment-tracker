import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Alert,
    Stack,
    Heading,
    Container,
} from '@chakra-ui/react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [addUser] = useMutation(ADD_USER);
    const [userFormData, setUserFormData] = useState({ firstname: '', lastname: '', email: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });

            Auth.login(data.addUser.token);
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        }

        setUserFormData({ firstname: '', lastname: '', email: '', password: '' });
    };

    return (
        <Container p='10'>
            <Box>
                <Stack spacing="6" textAlign="center">
                    <Heading size="lg" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text" pb='10'>
                        Sign up for an account
                    </Heading>
                </Stack>

                <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }} bg="bg.surface" boxShadow="xl" borderRadius="xl">
                    <form onSubmit={handleSubmit}>
                        {showAlert && (
                            <Alert status="error" mb={4}>
                                Something went wrong with your signup!
                            </Alert>
                        )}

                        <FormControl id="firstname" isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                name="firstname"
                                value={userFormData.firstname}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl id="lastname" isRequired mt={4}>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                name="lastname"
                                value={userFormData.lastname}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl id="email" isRequired mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={userFormData.email}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <FormControl id="password" isRequired mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={userFormData.password}
                                onChange={handleInputChange}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            mt={4}
                            mb={4}
                            isDisabled={!userFormData.firstname || !userFormData.lastname || !userFormData.email || !userFormData.password}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default SignupForm;
