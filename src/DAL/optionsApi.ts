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
    setUserPhoto: (photo: File) => {
        const formData = new FormData()
        formData.append("image", photo)
        debugger
        return instance.put<setUserPhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        })
    }
}