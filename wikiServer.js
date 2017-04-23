var rp = require('request-promise');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var async = require("async");
var fs = require('fs');

var app = express();


var linkArray = ['https://en.wikipedia.org/wiki/Joseph_Willibrord_M%C3%A4hler'];
var wikiDataArray = [];

var relations = {};

url = 'https://en.wikipedia.org/wiki/Joseph_Willibrord_M%C3%A4hler';
wikiDataUrl = "";
i = 0;
// do something with the result
/*var doRequest = function(callback) {

    if (!error) {
      var $ = cheerio.load(html);
      var wikidata = $('#t-wikibase');
      wikidata = wikidata[0].children[0].attribs.href;


      $('#mw-content-text')
        .filter(function() {
          var data = $(this);
          var links = $('p')
            .contents();
          for (var key in links) {
            if (links[key].name === 'a') {
              if (links[key].attribs.href.substring(0,5) === "/wiki") {
                var currLink = 'https://en.wikipedia.org' + links[key].attribs.href;
                if(currLink.indexOf('#') > -1){
                  currLink = currLink.substring(0, currLink.indexOf('#'));
                }
                if(currLink.indexOf('_(') > -1){
                  currLink = currLink.substring(0, currLink.indexOf('_('));
                }
                if (!linkArray.includes(currLink)) {
                  linkArray.push(currLink);
                  if (relations.hasOwnProperty(url)) {
                    //console.log(url)
                    relations[url].push(currLink);
                  } else {
                    //console.log(url)
                    relations[url] = [currLink];
                  }
                }
              }
            }
          }
        });
    } else {
      console.log("ERROR: ", error);
    }
    //console.log("I", linkArray[i]);
    callback(null, relations);
  });
}*/

var options = {
  uri: url,
  transform: function(body) {
    return cheerio.load(body);
  }
};

var currBody = "";


var doRequest = function(callback) {

  var currLink = "";
  rp(options)
    .then(function($) {
      currBody = $;
      // Process html like you would with jQuery...

      $('#mw-content-text')
        .filter(function() {
          var data = $(this);
          var links = $('p')
            .contents();
          for (var key in links) {
            if (links[key].name === 'a') {
              if (links[key].attribs.href.substring(0, 5) === "/wiki") {
                currLink = 'https://en.wikipedia.org' + links[key].attribs.href;
                //console.log(currLink);
                if (currLink.indexOf('#') > -1) {
                  currLink = currLink.substring(0, currLink.indexOf('#'));
                }
                if (currLink.indexOf('_(') > -1) {
                  currLink = currLink.substring(0, currLink.indexOf('_('));
                }
                if (!linkArray.includes(currLink)) {
                  linkArray.push(currLink);
                  if (relations.hasOwnProperty(url)) {
                    //console.log(url)
                    relations[url].push(currLink);
                  } else {
                    //console.log(url)
                    relations[url] = [currLink];
                  }
                }
              }
            }
          }
        })
        //console.log(relations);
      callback(null, relations);
    });

};

var isHuman = function(val, callback) {
  var wikidata = currBody('#t-wikibase');
  wikidata = wikidata[0].children[0].attribs.href;
  //console.log(wikidata);
  options.uri = wikidata;
  console.log(wikidata);
  rp(options)
    .then(function(w$) {
      try {
        var isHuman = w$('.wikibase-snakview-value.wikibase-snakview-variation-valuesnak')[0].children[0].children[0].data === 'human';
      } catch(err) {
        return false;
      }
      return isHuman;
    })
    .then(function(isHuman) {
      if (!isHuman) {
        console.log("VAL", val);
        relations[url].splice(relations[url].indexOf(val), 1);
      }
    })
  callback(null, relations);
}


async.timesSeries(1, function(n, next) {
  doRequest(function(err, result) {
    i++;
    j = 0;
    async.timesSeries(relations[url].length, function(n, next) {
      isHuman(relations[url][j], function(error, res) {
        j++;
      });
    });
    url = linkArray[i];

    next(err, result);
  });

}, function(error, results) {
  // do something with your results
  console.log("END", relations);

  fs.writeFile('relations.json', JSON.stringify(relations, null, 4));
  //console.log(relations);

});









/*
var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address()
    .address;
  var port = server.address()
    .port;
  console.log('App listening at http://' + host + ':' + port);
}


app.use(express.static('public'));
*/
