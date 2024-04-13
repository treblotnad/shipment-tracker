import { useState } from 'react';
import { matchCarrier } from '../utils/carrierValidate';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react'

export default function SearchTracking({ onSaveShipment }) {
    const [input, setInput] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
        // reset error message when input changes
        setIsError(false);
        setErrorMessage('');
    };

    const handleSaveShipment = (e) => {
        e.preventDefault();
        console.log(input);
        if (input.length < 10) {
            setIsError(true);
            setErrorMessage('Tracking number must be at least 10 characters long');
            return;
        }

        const carrier = matchCarrier(input); // matchCarrier function from /utils/carrierValidate.js
        if (!carrier) {
            setIsError(true);
            setErrorMessage('Please enter a UPS, USPS, or FedEx tracking number.');
            return;
        }

        onSaveShipment(input, carrier); // pass the tracking number and carrier to the onSaveShipment function
        setInput(''); // clear the input field
    };

    return (
        <FormControl maxW='800px' isInvalid={isError} onSubmit={handleSaveShipment} >
            <InputGroup>
                <Input
                    h='2.5rem'
                    type='text'
                    value={input}
                    placeholder='Enter a tracking number'
                    onChange={handleInputChange}
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
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
            ) : (
                <FormHelperText>Enter a tracking number.</FormHelperText>
            )}

        </FormControl >
    );
}
