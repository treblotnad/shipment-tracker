import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

export default function ShipmentCard({ tracking, carrier }) {
    return (
        <Box w='100%' p={4} color='black' bg='gray.100' shadow='md' borderWidth='1px' borderRadius='md'>
            <Text fontSize="lg" fontWeight="bold">Tracking: {tracking || 'N/A'}</Text>
            <Text fontSize="lg">Carrier: {carrier || 'N/A'}</Text>
        </Box>
    )
}