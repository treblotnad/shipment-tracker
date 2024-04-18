import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import NavLogo from './Logo';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import {
    Box,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Flex,
    Spacer,
    IconButton,
    useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

const AppNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const { data, error } = useQuery(GET_ME);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box as="nav" p={4}>
                <Flex mx="2">
                    <Link to="/" >
                        <NavLogo w="200px" />
                    </Link>
                    <Spacer />
                    {Auth.loggedIn() ? (
                        <>
                            <Flex alignItems="center" display={{ sm: 'none', md: 'block' }}>
                                <Text as='i' px={5} mb={0} textColor="grey" fontSize="1rem">
                                    Hello, {data?.me?.firstname}
                                </Text>
                                <Link to="/dashboard" style={{ marginRight: '20px' }}>Dashboard</Link>
                                <Link to="/account" style={{ marginRight: '20px' }}>Account</Link>
                                <Button fontSize='1rem' onClick={Auth.logout}>Logout</Button>
                            </Flex>
                            <IconButton
                                size={'md'}
                                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                                aria-label={'Open Menu'}
                                display={{ md: 'none' }}
                                mt={2}
                                fontSize="1.1rem"
                                color="gray.500"
                                onClick={isOpen ? onClose : onOpen}
                            />
                        </>
                    ) : (
                        <Button fontSize='1rem' onClick={() => setShowModal(true)}>Login</Button>
                    )}
                </Flex>
            </Box>

            {/* Responsive Menu */}
            <Flex
                w="100%"
                h="100%"
                display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
                alignItems="flex-end"
                flexDirection="column"
                bgColor="white"
                gap={1}
                mt={-7}
                pr={2}
            >
                {Auth.loggedIn() && (
                    <>
                        <Text px={5} mb={0} textColor="grey" fontSize="1rem">
                            Hello, {data?.me?.firstname}
                        </Text>
                        <Link to="/dashboard" style={{ marginRight: '20px' }}>Dashboard</Link>
                        <Link to="/account" style={{ marginRight: '20px' }}>Account</Link>
                        <Button fontSize='1rem' style={{ marginRight: '15px' }} mt='3' onClick={Auth.logout}>Logout</Button>
                    </>
                )}
            </Flex>

            {/* Login modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <LoginForm handleModalClose={() => setShowModal(false)} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AppNavbar;
