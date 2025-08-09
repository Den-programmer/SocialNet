import React, { useState } from 'react'
import classes from './loginImg.module.scss'
import Tilt from 'react-vanilla-tilt'

const loginEnterImage = import.meta.env.VITE_CLOUDINARY_LOGIN_ENTER_IMAGE

const LoginImg: React.FC = () => {
  const [scale, setScale] = useState(1.1)

  const handleMouseEnter = () => setScale(1.2)
  const handleMouseLeave = () => setScale(1.1)

  return (
    <Tilt
      options={{
        reverse: false,
        max: 35,
        perspective: 1000,
        scale: scale,
        speed: 300,
        transition: true,
        easing: 'cubic-bezier(.03,.98,.52,.99)',
        glare: false,
      }}
    >
      <div className={classes.loginEnterImage}>
        <img
          src={loginEnterImage}
          alt="Login"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </Tilt>
  )
}

export default LoginImg