const axios = require('axios')
const cheerio = require('cheerio')

async function scrapeNews(url) {
    try {
        const response = await axios.get(url)
        console.log('HTML Content:', response.data)

        const $ = cheerio.load(response.data)
        
        const articleTitles = []
        $('a').each((index, element) => {
            const title = $(element).text().trim()
            console.log('Article Title:', title)
            articleTitles.push(title)
        })
        
        console.log('Scraped Article Titles:', articleTitles)
        return articleTitles
    } catch (error) {
        console.error('Error:', error)
        return []
    }
}

module.exports = { scrapeNews }