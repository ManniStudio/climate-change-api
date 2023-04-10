// index.js

// <script type="text/javascript" src="https://unpkg.com/default-passive-events"></script>


const PORT = 8000;
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()   // This calls the express app and instantiates it as a var app

const newspapers = [
{
    name: "the Global times",
    addr: "https://www.thetimes.co.uk/search?source=nav-desktop&q=climate+change",
    base: 'https://www.thetimes.co.uk/'
},
{
    name: "gaurdian",
    addr: "https://www.theguardian.com/environment/climate-crisis",
    base: ''
},
{
    name: "The NY Times",
    addr: "https://www.nytimes.com/search?query=climate+change",
    base: 'https://www.nytimes.com'
}
]

const articles = []

// Handle multiple news sources / loop thru each source
newspapers.forEach(newspaper => {
    axios.get(newspaper.addr) 
    .then (response => {
        const html = response.data
        const $ = cheerio.load(html)
        $('a:contains("climate")',html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push ({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            }) 
        })
    })
})


//http://localhost:8000/
app.get('/', (req, res) => {
    res.json('Welcome to my climate change AqqqPI app')
})

// scrape web page
// hit http://localhost:8000/news
app.get('/news', (req, res) => {
/*
   removed all axios code here and replaced with
*/
res.json(articles)
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


