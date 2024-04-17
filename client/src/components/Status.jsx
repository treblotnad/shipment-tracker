import { Badge } from "@chakra-ui/react";

export default function Status({ status }) {
  const statusBadge = {
    Pending: (
      <Badge colorScheme="yellow" size="sm">
        Pending
      </Badge>
    ),
    InTransit: (
      <Badge colorScheme="blue" size="sm">
        In Transit
      </Badge>
    ),
    OutForDelivery: (
      <Badge colorScheme="orange" size="sm">
        Out for Delivery
      </Badge>
    ),
    Delivered: (
      <Badge colorScheme="green" size="sm">
        Delivered
      </Badge>
    ),
    FailedAttempt: (
      <Badge colorScheme="red" size="sm">
        Failed Attempt
      </Badge>
    ),
    Exception: (
      <Badge colorScheme="red" size="sm">
        Exception
      </Badge>
    ),
    Expired: (
      <Badge colorScheme="red" size="sm">
        Expired
      </Badge>
    ),
    InfoReceived: (
      <Badge colorScheme="cyan" size="sm">
        Info Received
      </Badge>
    ),
  };

  return statusBadge[status] || <Badge fontSize=".9rem">Unknown Status</Badge>;
}
