import React from 'react'

interface IGeneralOptions {

}

const GeneralOptions:React.FC<IGeneralOptions> = (props) => {
    const temporaryStyle = { height: '100vh' }
    return (
        <div style={temporaryStyle}>
            In developing...
        </div>
    )
}


export default GeneralOptions