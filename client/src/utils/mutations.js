import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const SAVE_SHIPMENT = gql`
  mutation saveShipment($userId: ID, $shipmentData: ShipmentInput) {
    saveShipment(userId: $userId, shipmentData: $shipmentData) {
      _id
      email
      savedShipments {
        tracking
        carrier
        isDelivered
      }
    }
  }
`;

export const REMOVE_SHIPMENT = gql`
  mutation removeShipment($userId: ID!, $shipmentId: ID!) {
    removeShipment(userId: $userId, shipmentId: $shipmentId) {
      _id
      savedShipments {
        _id
      }
    }
  }
`;
