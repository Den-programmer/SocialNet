import React, { useState } from 'react'
import classes from './editPhoto.module.scss'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import { makeStyles, Theme, createStyles, Modal, Backdrop, Fade } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { ChangePhotosMenuItemType } from '../../../../../types/ProfileTypes/profileTypes'
import ChangeAvatar from './changeAvatar/changeAvatarContainer'
import DeleteAvatar from './DeleteAvatar/deleteAvatarContainer'
import ChangeBackground from './ChangeBackground/changeBackgroundContainer'

interface IEditPhoto {
    changePhotosMenuItemId: number
    changePhotosMenu: Array<ChangePhotosMenuItemType>
    choosePhotosMenuItem: (itemId: number) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalHeader: {
        backgroundColor: '#F4F4EC',
        borderBottom: '1px solid #EAE9E6',
        height: '50px',
        display: 'flex',
        alignItems: 'center'
    },
    modalBody: {
        width: '480px',
        height: '200px',
        margin: 'auto'
    },
    modalContent: {
        width: '500px',
        height: '350px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        position: 'relative'
    },
    photoCameraIcon: {
        color: '#FFF',
        opacity: '0.7',
        textShadow: '0 1px 2px rgba(0,0,0,.8)'
    },
    closeIcon: {
        cursor: 'pointer',
        fontSize: '16px',
        position: 'absolute',
        top: '5px',
        right: '10px'
    }
}))

const EditPhoto: React.FC<IEditPhoto> = ({ changePhotosMenu, choosePhotosMenuItem, changePhotosMenuItemId }) => {
    const s = useStyles()
    const [open, setOpenStatus] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpenStatus] = useState<boolean>(false)
    const commonStyle = {}
    const activeStyle = {
        backgroundColor: '#4dcadd',
        border: '1px solid #FFF',
        color: '#FFF'
    }
    const menuItems = changePhotosMenu.map((item: ChangePhotosMenuItemType) => {
        return <div onClick={() => choosePhotosMenuItem(item.id)} key={item.id} className={item.isActive ? classes.menuItemActive : classes.menuItem}>{item.title}</div>
    })
    return (<>
        <div onClick={() => setIsModalOpenStatus(true)} className={classes.editPhotoWrapper} onMouseEnter={() => setOpenStatus(true)} onMouseLeave={() => setOpenStatus(false)}>
            <div style={open ? activeStyle : commonStyle} className={classes.editPhoto}>
                <PhotoCameraIcon style={open ? { fontSize: '16px', padding: '4px', paddingRight: '0' } : { fontSize: '24px', padding: '0' }}
                    className={s.photoCameraIcon} />
                {open && <div className={classes.editPhotoContent__text}>Upload your photos</div>}
            </div>
        </div>
        <Modal className={s.modal} open={isModalOpen}
            onClose={() => setIsModalOpenStatus(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={isModalOpen}>
                <div className={s.modalContent}>
                    <div className={s.modalHeader}>
                        <div className={classes.menu}>{menuItems}</div>
                        <CloseIcon onClick={() => setIsModalOpenStatus(false)} className={s.closeIcon} />
                    </div>
                    <div className={s.modalBody}>
                        {changePhotosMenuItemId === 1 ?
                            <ChangeAvatar setIsModalOpenStatus={setIsModalOpenStatus} /> : changePhotosMenuItemId === 2 ?
                                <DeleteAvatar setIsModalOpenStatus={setIsModalOpenStatus}/> : <ChangeBackground setIsModalOpenStatus={setIsModalOpenStatus} />}
                    </div>
                </div>
            </Fade>
        </Modal>
    </>)
}


export default EditPhoto