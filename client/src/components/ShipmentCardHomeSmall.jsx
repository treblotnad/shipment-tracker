import { dateToWeekDate, dateToShortDate } from "../utils/datetime";
import Status from "./Status";

import {
    Card,
    CardHeader,
    CardBody,
    Text,
    Image,
    Grid,
    GridItem,
    Box,
    Center,
    Divider,
    Flex,
    HStack,
    VStack,
    useBreakpointValue,
} from "@chakra-ui/react";

import { ArrowRightIcon } from "@chakra-ui/icons";

const logo = {
    ups: "/images/ups.png",
    fedex: "/images/fedex.png",
    usps: "/images/usps.png",
};

let arrived = 'Arriving ';


export default function ShipmentCardHomeSmall({ shipmentDetails, mapImage }) {
    function etaDefine() {
        if (shipmentDetails.current_status === "Delivered") {
            arrived = 'Arrived ';
            return dateToWeekDate(shipmentDetails.trackings.shipment_delivery_date);
        } else {
            return (
                dateToWeekDate(shipmentDetails.trackings.expected_delivery) ||
                "ETA not available"
            );
        }
    }
    const eta = etaDefine();

    return (
        <p>Hello</p>
    )

}