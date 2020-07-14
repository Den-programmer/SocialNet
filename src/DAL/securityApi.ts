import { instance } from './api'

type captchaUrlType = { url: string }

export const SecurityAPI = {
    getCaptchaUrl: () => {
        return instance.get<captchaUrlType>(`/security/get-captcha-url`).then(response => {
            return response.data;
        });
    }
}