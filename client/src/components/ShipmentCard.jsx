import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_SHIPMENT } from "../utils/mutations";
import Auth from "../utils/auth";
import { Box, Text, Button } from '@chakra-ui/react';

export default function ShipmentCard({ shipmentId, tracking, carrier }) {
    const [removeShipment] = useMutation(REMOVE_SHIPMENT);

    const handleRemoveShipment = async () => {

        if (!Auth.loggedIn()) {
            console.error("Not logged in");
            return false;
        }

        try {
            await removeShipment({
                variables: {
                    userId: Auth.getUser().data._id,
                    shipmentId: shipmentId
                }
            });
            console.log("Removed shipment", shipmentId);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Box w='100%' p={4} color='black' bg='gray.100' shadow='md' borderWidth='1px' borderRadius='md'>
            <Text fontSize="lg" fontWeight="bold">Tracking: {tracking || 'N/A'}</Text>
            <Text fontSize="lg">Carrier: {carrier || 'N/A'}</Text>
            <Button colorScheme='red' onClick={handleRemoveShipment}>Remove</Button>
        </Box>
    )
}