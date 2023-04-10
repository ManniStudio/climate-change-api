// index.js

// <script type="text/javascript" src="https://unpkg.com/default-passive-events"></script>


const PORT = 8000;
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()   // This calls the express app and instantiates it as a var app

const newspapers = [
{
    name: "thetimes",
    addr: "https://www.thetimes.co.uk/search?source=nav-desktop&q=climate+change"
},
{
    name: "gaurdian",
    addr: "https://www.theguardian.com/environment/climate-crisis"
},
{
    name: "The NY Times",
    addr: "https://www.nytimes.com/search?query=climate+change"
}
]
const articles = []


// scrape web page
//http://localhost:8000/
app.get('/', (req, res) => {
    res.json('Welcome to my climate change AqqqPI app')
})

// hit http://localhost:8000/news
app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
    .then((response) => {
        const html = response.data
        // console.log(html)   // just dumps html to console unreadable
        const $ = cheerio.load(html)

        $('a:contains("climate")',html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push ({
                title, url
            }) 
        })
        res.json(articles)
    }).catch((err) => console.log(err))
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

