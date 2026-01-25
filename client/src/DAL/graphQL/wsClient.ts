import { createClient } from 'graphql-ws'

export const wsClient = createClient({
  url: 'ws://localhost:8000/graphql',
  connectionParams: () => ({
    authorization: `Bearer ${localStorage.getItem('token')}`
  })
})