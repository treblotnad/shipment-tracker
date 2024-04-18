import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Alert,
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
        <Box>
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
                    isDisabled={!userFormData.firstname || !userFormData.lastname || !userFormData.email || !userFormData.password}
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default SignupForm;
