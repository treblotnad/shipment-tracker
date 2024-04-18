import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import NavLogo from './Logo';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const AppNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const { loading, data, error } = useQuery(GET_ME);

    return (
        <>
            <Box as="nav" p={4} bg="blue.500" color="white">
                <Link to="/" style={{ marginRight: '20px' }}>
                    <NavLogo w="200px" />
                </Link>
                <Box ml="auto">
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <>
                            {Auth.loggedIn() ? (
                                <>
                                    <Text px={2} paddingRight="30px" paddingTop="5px" textColor="grey" fontSize="19px">
                                        Hello, {data?.me?.firstname}
                                    </Text>
                                    <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
                                    <Link to="/account" style={{ marginRight: '10px' }}>Account</Link>
                                    <Button onClick={Auth.logout}>Logout</Button>
                                </>
                            ) : (
                                <Button onClick={() => setShowModal(true)}>Login</Button>
                            )}
                        </>
                    )}
                </Box>
            </Box>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <LoginForm handleModalClose={() => setShowModal(false)} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AppNavbar;
