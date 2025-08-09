import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const elRef = useRef(document.createElement('div'))

  useEffect(() => {
    const el = elRef.current
    document.body.appendChild(el)
    return () => {
      document.body.removeChild(el)
    }
  }, [])

  return createPortal(children, elRef.current)
}