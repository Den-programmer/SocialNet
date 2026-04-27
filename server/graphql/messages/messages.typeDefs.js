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

  type DeletedMessage {
    messageId: ID!
    conversationId: ID!
  }

  type TypingStatus {
    userId: ID!
    username: String!
    conversationId: ID!
    isTyping: Boolean!
  }

  type DeletedDialog {
    dialogId: ID!
  }

  type Mutation {
    startDialog(userId: ID!): Dialog!
    sendMessage(conversationId: ID!, text: String!, image: String): Message!
    deleteMessage(messageId: ID!): Boolean!
    deleteDialog(dialogId: ID!): Boolean!
    setTyping(conversationId: ID!, isTyping: Boolean!): Boolean!
  }

  type Subscription {
    messageSent(conversationId: ID): Message!
    messageDeleted(conversationId: ID): DeletedMessage!
    dialogStarted: Dialog!
    dialogDeleted: DeletedDialog!
    userTyping(conversationId: ID): TypingStatus!
  }
`