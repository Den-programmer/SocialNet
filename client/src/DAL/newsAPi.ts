import { instance } from "./api"

export const NewsAPI = {
    getAllNews: () => {
        return instance.get('api/news/getNews').then(res => res.data)
    }
}