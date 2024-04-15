import { Box, Text } from '@chakra-ui/react';

export default function NavLogo(props) {
    return (
        <Box {...props}>
            <Text
                fontSize="4xl"
                fontWeight="extrabold"
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'
            >Deliverly</Text>
        </Box>
    );
}