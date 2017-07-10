const rp = require('request-promise')
const cheerio = require('cheerio')

const searchedMovie = process.argv[2]

var options = {
  uri: 'http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchedMovie}&s=all',
  transform: function(body) {
    return cheerio.load(body)
  }
}

rp(`http://www.imdb.com/find?ref_=nv_sr_fn&q=${searchedMovie}&s=all`)
    .then(function(body) {
      const $ = cheerio.load(body)
      const html = $('.findSection').first().find('.result_text')
        .map((i, elm) =>
        $(elm).text())
        .toArray()
      console.log(html)
      return html
    })
    .catch((err) => {
      console.log(err)
    })
