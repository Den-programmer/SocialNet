import { instance } from './api'

type userPhotoResType = {
    data: {
        small: string
        large: string
    }
    resultCode: number
    messages: Array<string>
}

export const OptionsAPI = {
    setUserPhoto: (photo: any) => {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put<userPhotoResType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        });
    }
}