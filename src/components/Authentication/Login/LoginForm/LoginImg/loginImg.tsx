import React, { MouseEvent, useState } from 'react'
import classes from './loginImg.module.css'
import loginEnterImage from '../../../../../images/loginImages/loginEnterImage.png'

interface ILoginImg {

}

type ImageStyleType = {
    transform: string
    transition: string
}

const LoginImg: React.FC<ILoginImg> = (props) => {
    const commonImageStyle = {
        transform: `scale3d(1.1, 1.1, 1.1)`,
        transition: 'all 400ms'
    }
    const [imageStyle, setImageStyle] = useState<ImageStyleType>(commonImageStyle)
    const peekingImg = (e: MouseEvent<HTMLImageElement>) => {
        setImageStyle({
            transform: `scale3d(1.2, 1.2, 1.2)`,
            transition: 'all 400ms'
        })
    }
    const stopPeeking = () => setImageStyle(commonImageStyle)
    return (
        <div className={classes.loginEnterImage}>
            <img onMouseLeave={stopPeeking} style={imageStyle} onMouseMove={peekingImg} src={loginEnterImage} alt="IMG" />
        </div>
    )
}

export default LoginImg