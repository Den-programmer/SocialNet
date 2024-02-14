import { instance } from "./api"

export const NewsAPI = {
    getAllNews: () => {
        return instance.get('api/news/getNews').then(res => res.data)
    },
    getPopularNews: () => {
        return instance.get('api/news/getPopularNews').then(res => res.data)
    }
}