import { useState } from 'react';
import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import SignupForm from './SignupForm';

export default function Hero() {
    const [showSignupModal, setShowSignupModal] = useState(false);

    const handleSignupModalOpen = () => setShowSignupModal(true);
    const handleSignupModalClose = () => setShowSignupModal(false);

    return (
        <Container maxW={'7xl'}>
            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 15, md: 23 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 5 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '30%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'red.300',
                                zIndex: -1,
                            }}>
                            Effortless
                        </Text>
                        <br />
                        <Text as={'span'} color={'red.500'}>
                            package tracking.
                        </Text>
                    </Heading>
                    <Box pt={4}>
                        <Image src={'../images/carriers.png'} height='30px' mb={1} />
                    </Box>
                    <Text color={'gray.500'}>
                        Get real-time updates on your package's location and estimated delivery time, all from one simple dashboard.
                    </Text>

                    <Stack spacing='{{ base: 12, sm: 4 }}' direction={{ base: 'column', sm: 'row' }} justify='left'>

                        <Button
                            size={'md'}
                            fontWeight={'bold'}
                            px={6}
                            colorScheme={'red'}
                            bg={'red.400'}
                            _hover={{ bg: 'red.500' }}
                            onClick={handleSignupModalOpen}
                        >
                            Sign Up
                        </Button>
                    </Stack>

                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>
                    <Box
                        position={'relative'}
                        height={'300px'}
                        width={'full'}
                        overflow={'hidden'}>
                        <Image
                            alt={'Hero Image'}
                            fit={'cover'}
                            align={'center'}
                            h={'100%'}
                            src={'../images/heroscreen.png'}
                        />
                    </Box>
                </Flex>
            </Stack>

            {/* Signup modal */}
            <Modal isOpen={showSignupModal} onClose={handleSignupModalClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <SignupForm />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container >
    )
}
