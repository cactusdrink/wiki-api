const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/', function(req, res) {

  let topic = req.query.topic.toLowerCase();

  let url = 'https://en.wikipedia.org/wiki/' + topic + '/'+'.html';


  request(url, function(error, response, html) {

    if (!error) {

      var $ = cheerio.load(html);

      var summary = $('vector.0 > p').text();

      var json = {
        topic: topic,
        summary: summary
      };

      // send the JSON as a response to the client
      res.send(json);
    }

  });

});

app.listen('8080');
console.log('API is running on http://localhost:8080');
module.exports = app;