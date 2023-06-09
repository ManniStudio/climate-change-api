// index.js

const PORT = 8000;
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()   // This calls the express app and instantiates it as a var app

<<<<<<< HEAD
const articles = []

// scrape web page
//http://localhost:8000/
app.get('/', (req, res) => {
    res.json('Welcome to my climate change API app')
})

// hit http://localhost:8000/news
app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
    .then((response) => {
        const html = response.data
        console.log(html)   // just dumps html to console unreadable
=======
//  JSON data to test with 
const newspapers = [
{
    name: "theglobaltimes",
    addr: "https://www.thetimes.co.uk/search?source=nav-desktop&q=climate+change",
    base: 'https://www.thetimes.co.uk/'
},
{
    name: "gaurdian",
    addr: "https://www.theguardian.com/environment/climate-crisis",
    base: ''
},
{
    name: "theNytimes",
    addr: "https://www.nytimes.com/search?query=climate+change",
    base: 'https://www.nytimes.com'
}
]

const articles = []

/*  Handle multiple news sources / loop thru each source
    using AXIOS & CHERRIO */
newspapers.forEach(newspaper => {
    axios.get(newspaper.addr) 
    .then (response => {
        const html = response.data
>>>>>>> just-one-newspaper-article
        const $ = cheerio.load(html)
        $('a:contains("climate")',html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push ({
<<<<<<< HEAD
                //title, url
                title
=======
                title,
                url: newspaper.base + url,
                source: newspaper.name
>>>>>>> just-one-newspaper-article
            }) 
        })
    })
})

// Landing page
// http://localhost:8000/
app.get('/', (req, res) => {
    res.json('Welcome to my climate change AqqqPI app')
});

// Scrape web page
// hit http://localhost:8000/news
app.get('/news', (req, res) => {
    //   I removed all axios code here and replaced with just this:
    res.json(articles)
});

/*  Here we just want to retrieve an article based on its ID
    hit http://localhost:8000/news
    Then Use the Colon (:) very important, acts an an ID being passed in the req to the server
    Ex: hit http://localhost:8000/news/bigD   > console log will display "bigD" */
app.get('/news/:newspaperId', async (req, res) => { 
// console.log(req) // This shows all the payload in req  (search for 'params')
    console.log('Request for newspaper id is: ', req.params.newspaperId);
/*  Now this builds on the prev above
    Find a specific news source directly and then retrieve its address from the newspapers Object above
    Ex1: http://localhost:8000/news/theglobaltimes
    console log shows obj addr
    Server running on port 8000
    Request for newspaperID is:  theglobaltimes
    addr = https://www.thetimes.co.uk/search?source=nav-desktop&q=climate+change
    Ex2: http://localhost:8000/news/gaurdian
    Ex3: http://localhost:8000/news/theNYtimes */
    const newspaperId = req.params.newspaperId
    const newspaper = newspapers.filter(newspaper => newspaper.name == newspaperId);
    console.log(newspaper)  // get back whole OBJ


//const newspaperAddr = newspapers.filter(newspaper => newspaper.name == newspaperId[0].addr);

/* console.log('newspaperID=', newspaperID)
console.log('newspaper.name=', newspapers.newspaper.name)
console.log('newspaper[0].addr=', newspapers.newspaper[0].addr)
console.log(newspaperAddr);
*/
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))