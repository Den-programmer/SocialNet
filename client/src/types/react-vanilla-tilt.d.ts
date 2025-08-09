declare module 'react-vanilla-tilt' {
  import React from 'react'

  export interface TiltOptions {
    reverse?: boolean
    max?: number
    perspective?: number
    scale?: number
    speed?: number
    transition?: boolean
    easing?: string
    glare?: boolean
    'max-glare'?: number
  }

  interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
    options?: TiltOptions
    children?: React.ReactNode
  }

  const Tilt: React.FC<TiltProps>

  export default Tilt
}