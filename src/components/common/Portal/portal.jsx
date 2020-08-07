import React from 'react'
import ReactDOM from 'react-dom'

export class Portal extends React.Component {
    el = document.createElement('div')

    componentDidMount() {
        document.body.appendChild(this.el)
    }
    componentWillUnmount() {
        document.body.removeChild(this.el)
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
} 