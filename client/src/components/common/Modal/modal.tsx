import React from 'react'
import classes from './modal.module.css'
import { Portal } from '../Portal/portal'

interface IModal {
    title: string
    isOpen: boolean
    onCancel: () => void
    onSubmit: () => void
}

export const Modal: React.FC<IModal> = ({ title, isOpen, onCancel, onSubmit, children }) => {
    return (
        <>
            {isOpen && <Portal>
                <div className={classes.modalContainer}>
                    <div className={classes.modal}>
                        <div className={classes.modalHeader}>
                            <div className={classes.title}><h3>{title}</h3></div>
                        </div>
                        <div className={classes.modalBody}>
                            {children}
                        </div>
                        <div className={classes.modalFooter}>
                            <button className={classes.btn_ok} onClick={onSubmit}>OK</button>
                            <button className={classes.btn_cancel} onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Portal>}
        </>
    )
}