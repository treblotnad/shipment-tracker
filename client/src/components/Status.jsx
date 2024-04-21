import { Badge } from "@chakra-ui/react";

export default function Status({ status, fontSize = "lg" }) {
  const statusBadge = {
    Pending: (
      <Badge colorScheme="yellow" fontSize={fontSize} py={2} px={4} rounded="md">
        Pending
      </Badge>
    ),
    InTransit: (
      <Badge colorScheme="blue" fontSize={fontSize} py={2} px={4} rounded="md">
        In Transit
      </Badge>
    ),
    OutForDelivery: (
      <Badge colorScheme="orange" fontSize={fontSize} py={2} px={4} rounded="md">
        Out for Delivery
      </Badge>
    ),
    Delivered: (
      <Badge colorScheme="green" fontSize={fontSize} py={2} px={4} rounded="md">
        Delivered
      </Badge>
    ),
    FailedAttempt: (
      <Badge colorScheme="red" fontSize={fontSize} py={2} px={4} rounded="md">
        Failed Attempt
      </Badge>
    ),
    Exception: (
      <Badge colorScheme="red" fontSize={fontSize} py={2} px={4} rounded="md">
        Exception
      </Badge>
    ),
    Expired: (
      <Badge colorScheme="red" fontSize={fontSize} py={2} px={4} rounded="md">
        Expired
      </Badge>
    ),
    InfoReceived: (
      <Badge colorScheme="cyan" fontSize={fontSize} py={2} px={4} rounded="md">
        Info Received
      </Badge>
    ),
  };

  return statusBadge[status] || <Badge fontSize={fontSize}>Unknown Status</Badge>;
}
