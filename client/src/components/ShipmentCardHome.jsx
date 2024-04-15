import { Card } from 'react-bootstrap';

export default function ShipmentCardHome({ shipmentDetails }) {
    return (
        <Card>
            <Card.Header>Tracking Details</Card.Header>
            <Card.Body>
                <Card.Text>Status: {shipmentDetails.trackings.tag}</Card.Text>
                <Card.Text>Ship From: {shipmentDetails.trackings.address.ship_from.address_line1} {shipmentDetails.trackings.address.ship_from.city}, {shipmentDetails.trackings.address.ship_from.state}</Card.Text>
            </Card.Body>
        </Card>
    );
};
