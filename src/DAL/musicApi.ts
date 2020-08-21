import { musicInstance } from './api'


export const MusicAPI = {
   getTracks: () => {
        return musicInstance.post(`getTracks`)
   }
}