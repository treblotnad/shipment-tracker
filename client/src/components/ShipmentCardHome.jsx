import { dateToWeekDate, dateToShortDate } from '../utils/datetime';
import Status from './Status';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    Image,
    Grid,
    GridItem,
    Box,
    Center,
} from "@chakra-ui/react";

import { ArrowRightIcon } from '@chakra-ui/icons';

const logo = {
    'ups': '/images/ups.png',
    'fedex': '/images/fedex.png',
    'usps': '/images/usps.png',
}

export default function ShipmentCardHome({ shipmentDetails }) {
    return (
        <>
            {console.log(shipmentDetails)}
            <Card boxShadow='dark-lg' p='6' rounded='md' bg='white' mt={12} mb={20}>
                <CardHeader>
                    <Grid templateColumns='100px 1.5fr 3fr 1fr 150px' gap={3} >

                        {/* Logo based on the carrier, with image sources in the const above */}
                        <GridItem>
                            {shipmentDetails.slug === 'ups' && <Image src={logo.ups} alt='UPS' height='40px' />}
                            {shipmentDetails.slug === 'fedex' && <Image src={logo.fedex} alt='FedEx' height='40px' />}
                            {shipmentDetails.slug === 'usps' && <Image src={logo.usps} alt='USPS' height='40px' />}
                        </GridItem>
                        <GridItem alignSelf='center'>
                            {/* <Center h='40px'> */}
                            <Text fontWeight='bold'>{shipmentDetails.tracking_number}</Text>
                            {/* </Center> */}
                        </GridItem>
                        <GridItem>
                            <Center h='40px'>
                                <Text fontWeight='bold'>
                                    {shipmentDetails.trackings.address.ship_from.city}, {shipmentDetails.trackings.address.ship_from.state}  <ArrowRightIcon boxSize={8} mx={12} />{shipmentDetails.trackings.address.ship_to.city}, {shipmentDetails.trackings.address.ship_to.state}
                                </Text>
                            </Center>
                        </GridItem>
                        <GridItem align='right'>
                            <Center h='40px'>
                                <Text fontWeight='bold'>
                                    {dateToWeekDate(shipmentDetails.trackings.expected_delivery) || 'Not available'}
                                </Text>
                            </Center>
                        </GridItem>
                        <GridItem align='right'>
                            <Status status={shipmentDetails.trackings.tag} />
                        </GridItem>
                    </Grid>
                </CardHeader>

                {/* The map on the left, and all the checkpoints on the right */}
                <CardBody>
                    <Grid templateColumns='1fr 2fr' gap={4} >
                        <GridItem>
                            <Image src='images/map.jpg' alt='Map' />
                            <Text color='gray' fontSize='sm' mt={2}>
                                <strong>{shipmentDetails.trackings.shipment_type || ''}</strong> • Shipped on {dateToWeekDate(shipmentDetails.trackings.shipment_pickup_date)}
                            </Text>
                        </GridItem>

                        <GridItem>
                            {/* Each checkpoint and message */}
                            <Grid templateColumns='repeat(3, 1fr)' gap={1}>


                                {shipmentDetails.trackings.checkpoints.map((checkpoint, index) => {
                                    if (index === 0) return null; // Skip the first checkpoint
                                    return (
                                        <GridItem key={index}>
                                            <Box pl={3} pb={5}>
                                                <Text mb={0}>
                                                    {dateToShortDate(checkpoint.checkpoint_time)}: {checkpoint.city}, {checkpoint.state}
                                                </Text>
                                                <Text as='i' color='gray' >
                                                    {checkpoint.message}
                                                </Text>
                                            </Box>
                                        </GridItem>
                                    );
                                })}
                            </Grid>
                        </GridItem>
                    </Grid>
                </CardBody>
            </Card >
        </>
    );
};
