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
  mutation addUser($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
    addUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $firstname: String, $lastname: String, $email: String) {
    updateUser(id: $id, firstname: $firstname, lastname: $lastname, email: $email) {
      _id
      firstname
      lastname
      email
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
