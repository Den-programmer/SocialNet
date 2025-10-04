import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { messagesTypeDefs } from "./messages/messages.typeDefs.js";
import { messagesResolvers } from "./messages/messages.resolvers.js";

const typeDefs = mergeTypeDefs([messagesTypeDefs]);
const resolvers = mergeResolvers([messagesResolvers]);
export { typeDefs, resolvers };