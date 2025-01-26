import { instance } from './api'

type photosType = {
    small: string
    large: string
}
type setUserPhotoType = {
    data: {
        photos: photosType
    }
    messages: Array<string>
    resultCode: number
}

export const OptionsAPI = {
    setUserPhoto: (photo: File, userId: string) => {
        const formData = new FormData()
        formData.append("image", photo)
        formData.append("userId", userId)
        return instance.put<setUserPhotoType>(`api/avatar/updateAvatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        })
    }
}