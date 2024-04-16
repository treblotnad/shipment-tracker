import { Button } from '@chakra-ui/react';

export default function Status({ status }) {

    const statusButton = {
        Pending: <Button colorScheme='yellow' size='sm'>Pending</Button>,
        InTransit: <Button colorScheme='blue' size='sm'>In Transit</Button>,
        OutForDelivery: <Button colorScheme='orange' size='sm'>Out for Delivery</Button>,
        Delivered: <Button colorScheme='green' size='sm'>Delivered</Button>,
        FailedAttempt: <Button colorScheme='red' size='sm'>Failed Attempt</Button>,
        Exception: <Button colorScheme='red' size='sm'>Exception</Button>,
        Expired: <Button colorScheme='red' size='sm'>Expired</Button>,
        InfoReceived: <Button colorScheme='cyan' size='sm'>Info Received</Button>,
    };

    return statusButton[status] || <Button size='sm'>Unknown Status</Button>;
}