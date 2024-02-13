const axios = require('axios')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')

const newsInstance = axios.create({
    withCredentials: false,
    baseURL: "https://api.nytimes.com/svc/"
})


class NewsController {
    async getNews(req, res) {
        try {
            const response = await newsInstance.get(`mostpopular/v2/viewed/1.json?api-key=${process.env.NEWS_API_KEY}`).then(res => res.data)
            
            const copyright = response.copyright
            const articlesTitles = response.results.map(res => ({ id: res.id, date: res.published_date, title: res.title, copyright, text: res.abstract, link: res.url }))

            // console.log(articlesTitles)


            res.json(new StandartRes(0, '', { articlesTitles }))
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new NewsController()