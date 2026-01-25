import { gql } from 'graphql-tag'

export const messagesTypeDefs = gql`
  type Photos {
    small: String
    large: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    photos: Photos
  }

  type Message {
    id: ID!
    text: String
    sender: User!
    receiver: User!
    createdAt: String
    conversationId: ID!
    image: String
  }

  type Dialog {
    id: ID!
    participants: [User!]!
    messages: [Message!]!
    updatedAt: String!
  }

  type Query {
    dialogs: [Dialog!]!
    messages(conversationId: ID!): [Message!]!
    conversation(id: ID!): Dialog
  }

  type Mutation {
    startDialog(userId: ID!): Dialog!
    sendMessage(conversationId: ID!, text: String!, image: String): Message!
  }

  type Subscription {
    messageSent(conversationId: ID): Message!
  }
`