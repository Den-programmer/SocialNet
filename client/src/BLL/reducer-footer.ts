import { createSlice } from '@reduxjs/toolkit'
import { footLinkType } from '../types/FooterTypes/footerTypes'

type FooterType = {
  year: number
  footInf: string
  footLinks: Array<footLinkType>
}

const initialState: FooterType = {
  year: new Date().getFullYear(),
  footInf: 'This is footer\'s information!',
  footLinks: [
    {
      id: 7001,
      name: 'Profile',
      path: '/Profile'
    },
    {
      id: 7002,
      name: 'Messages',
      path: '/Messages'
    },
    {
      id: 7003,
      name: 'News',
      path: '/News'
    },
    {
      id: 7004,
      name: 'Options',
      path: '/Options'
    }
  ]
}

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
    // for future footer logic
  }
})

export default footerSlice.reducer