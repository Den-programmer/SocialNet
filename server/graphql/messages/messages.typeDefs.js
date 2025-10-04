import { gql } from 'graphql-tag';

export const messagesTypeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }
    type Message {
        id: ID!
        text: String!
        sender: User!
        receiver: User!
        createdAt: String!
    }
    type Conversation {
        id: ID!
        participants: [User!]!
        messages: [Message!]!
        updatedAt: String!
    }

    type Query {
        messages(conversationId: ID!): [Message!]!
        conversation(id: ID!): Conversation
    }
    type Mutation {
        sendMessage(conversationId: ID!, text: String!): Message!
    }

    type Subscription {
        messageSent(conversationId: ID!): Message!
    }
`