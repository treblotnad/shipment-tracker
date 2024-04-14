const typeDefs = `#graphql

type User {
    _id: ID!
    username: String
    email: String
    shipmentCount: Int
    savedShipments: [Shipment]
}

type Shipment {
    _id: ID
    tracking: String
    carrier: String
    isDelivered: Boolean
    hiveId: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String!): User
    me: User
    shipments(username: String): [Shipment]
    shipment(shipmentId: ID!): Shipment
    getTrackingInfo(tracking: String!, carrier: String!): Shipment
}

input ShipmentInput {
    tracking: String!
    carrier: String!
    hiveid: String
}

type Mutation {
    addUser(
        username: String!, 
        email: String!, 
        password: String!
        ): Auth
    login(
        email: String!, 
        password: String!
        ): Auth
    saveShipment(
        userId: ID, 
        shipmentData: ShipmentInput
        ): User
    removeShipment(
        userId: ID!,
        shipmentId: ID!
        ): User
}

`;

module.exports = typeDefs;
