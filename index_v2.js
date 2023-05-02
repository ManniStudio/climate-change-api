// index_v2.js
const PORT = 8000;
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()   // This calls the express app and instantiates it as a var app

//  JSON test datA
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

/*  Handle multiple news sources / loop thru each source
    using AXIOS & CHERRIO
    Note: This function is generic where it can handle different source types such as from:
    All the newspapers (ie: newspapers OBJ) -OR-
    A URL to a specific source
*/
const articles = []

function getArticles(sources) {
console.log('INSIDE getArticles')
let sctr=0
let actr=0
sources.forEach(newspaper => {
//newspapers.forEach(newspaper => {
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
            console.log('article ctr: ', ++actr)
        })
    }).catch(err => console.log(err))
    console.log('source ctr: ', ++sctr)
})
};

//newspapers.forEach(newspaper => {
    console.log('Calling getArticles func')
    getArticles(newspapers);
//});


// Landing page
// http://localhost:8000/
app.get('/', (req, res) => {
    res.json('Welcome to my climate change AqqqPI app')
    console.log('Landing Page')

});

// Scrape web page
// hit http://localhost:8000/news
app.get('/news', (req, res) => {
    //   I removed all axios code here and replaced with just this:
    console.log('/news route')
    res.json(articles)
});

/*  Here we just want to retrieve an article based on its ID
    hit http://localhost:8000/news
    Then Use the Colon (:) very important, acts an an ID being passed in the req to the server
    Ex: hit http://localhost:8000/news/bigD   > console log will display "bigD" */
app.get('/news/:newspaperId', async (req, res) => { 
// console.log(req) // This shows all the payload in req  (search for 'params')
    console.log('/news/Id route')
    console.log('Request for newspaper id is: ', req.params.newspaperId);
/*  Now this builds on the prev above
    Find a specific news source directly and then retrieve its address from the newspapers Object above
    Ex1: http://localhost:8000/news/theglobaltimes
    console log shows obj addr
    Server running on port 8000
    Request for newspaperID is:  theglobaltimes
    addr = https://www.thetimes.co.uk/search?source=nav-desktop&q=climate+change
    Ex2: http://localhost:8000/news/gaurdian
    Ex3: http://localhost:8000/news/theNytimes */
    const newspaperId = req.params.newspaperId
    const newspaper = newspapers.filter(newspaper => newspaper.name == newspaperId);
    console.log ('newspaperId', newspaperId)
    console.log('Whole Newspaper OBJ=',newspaper)  // get back whole OBJ

// Now lets get the URL for newspaper #1 only
//const newspaperAddr = newspapers.filter(newspaper => newspaper.name == newspaperId.addr);
//console.log('Calling getArticles - ', req.params.addr)
//getArticles(newspaper.addr)
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))