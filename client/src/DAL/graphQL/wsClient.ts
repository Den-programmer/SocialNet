import { createClient } from 'graphql-ws'
import { getToken } from '../../BLL/reducer-auth'

export const wsClient = createClient({
  url: 'ws://localhost:8000/graphql',
  connectionParams: () => ({
    authorization: `Bearer ${getToken()}`
  })
})