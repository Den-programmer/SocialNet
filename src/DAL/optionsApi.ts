import { instance } from './api'

type photosType = {
    small: string
    large: string
}
type setUserPhotoType = {
    photos: photosType
    messages: Array<string>
    resultCode: number
}

export const OptionsAPI = {
    setUserPhoto: (photo: any) => {
        const formData = new FormData()
        formData.append("image", photo)

        return instance.put<setUserPhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        })
    }
}