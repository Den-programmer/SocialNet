import axios from 'axios'
import { catchRes, StandartRes } from '../routes/responses/responses.js'

const newsInstance = axios.create({
  withCredentials: false,
  baseURL: 'https://api.nytimes.com/svc/'
})

class NewsController {
  async getNews(req, res) {
    try {
      const response = await newsInstance
        .get(`mostpopular/v2/viewed/1.json?api-key=${process.env.NEWS_API_KEY}`)
        .then(res => res.data)

      const copyright = response.copyright
      const articlesTitles = response.results.map(res => ({
        id: res.id,
        date: res.published_date,
        title: res.title,
        copyright,
        text: res.abstract,
        link: res.url
      }))

      res.json(new StandartRes(0, '', { news: articlesTitles }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async getPopularNews(req, res) {
    try {
      const response = await newsInstance
        .get(`topstories/v2/world.json?api-key=${process.env.NEWS_API_KEY}`)
        .then(res => res.data)

      const copyright = response.copyright
      const articlesTitles = response.results.map((item, index) => ({
        title: item.title,
        id: index,
        text: item.abstract,
        link: item.url,
        date: item.published_date,
        copyright
      }))

      res.json(new StandartRes(0, '', { news: articlesTitles }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }
}

export default new NewsController()