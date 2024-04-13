import { useState } from 'react';
import { matchCarrier } from '../utils/carrierValidate';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react'

export default function SearchTracking({ onSaveShipment }) {
    const [input, setInput] = useState('')
    const isError = input === input.length < 10

    const handleSaveShipment = (event) => {
        event.preventDefault();
        console.log(input);
        if (input.length >= 6) {
            const carrier = matchCarrier(input); // matchCarrier function from client/src/utils/carrierValidate.js
            onSaveShipment(input, carrier); // pass the tracking number and carrier to the onSaveShipment function
            setInput(''); // clear the input field
        }
    };

    return (
        <FormControl maxW='800px' isInvalid={isError} onSubmit={handleSaveShipment} >
            <FormLabel>Search Tracking</FormLabel>
            <InputGroup>
                <Input
                    h='2.5rem'
                    type='text'
                    value={input}
                    placeholder='Enter a tracking number'
                    onChange={(e) => setInput(e.target.value)}
                />
                <InputRightElement width='5rem'>
                    < Button
                        h='2rem'
                        size='md'
                        type="submit"
                        onClick={handleSaveShipment}
                    >Add</Button>
                </InputRightElement>
            </InputGroup>
            {isError ? (
                <FormErrorMessage>Tracking number must be at least 10 characters long</FormErrorMessage>
            ) : (
                <FormHelperText>Enter a tracking number.</FormHelperText>
            )}

        </FormControl >
    );
}
