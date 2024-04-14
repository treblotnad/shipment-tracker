import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { matchCarrier } from '../utils/carrierValidate';

export default function SearchTrackingHome({ onResults, onError, onInputClear }) {
    const [trackingNumber, setTrackingNumber] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const carrier = matchCarrier(trackingNumber);
        if (!trackingNumber || !carrier) {
            onError('Please enter a valid tracking number.');
            return;
        }

        try {
            onError(null); // clears any previous error message
            onInputClear(); // clears any previous results when trying a new search
            const response = await axios.post('http://localhost:3001/api/trackshipment', {
                tracking: trackingNumber,
                carrier
            });
            const shipmentData = response.data;
            if (!shipmentData || shipmentData.trackings.tag === 'Pending') {
                onError('No shipment found or the shipment is currently pending.');
            } else {
                onResults(response.data);
            }

        } catch (error) {
            console.error('Failed to fetch tracking details:', error);
            onError('Failed to fetch tracking details');
        }
    };

    const handleInputChange = (e) => {
        if (e.target.value !== trackingNumber) {
            onError(null); // clears any previous error message
            onInputClear(); // clears any previous results when trying a new search
        }
        setTrackingNumber(e.target.value);
    };

    return (
        <Form onSubmit={handleSearch}>
            <Form.Group>
                <Form.Label>Tracking Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Type in Tracking Number"
                    value={trackingNumber}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Button onClick={handleSearch}>
                Search
            </Button>
        </Form>
    );
};



