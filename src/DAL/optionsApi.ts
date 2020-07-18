import { instance, ServerResType } from './api'

type photosType = {
    small: string
    large: string
}

export const OptionsAPI = {
    setUserPhoto: (photo: any) => {
        const formData = new FormData()
        formData.append("image", photo)

        return instance.put<ServerResType<photosType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        })
    }
}