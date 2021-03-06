const e = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


// Get a random quote
app.get('/api/quotes/random', (req, res, next)=>{
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
});

// Get all quotes
app.get('/api/quotes', (req, res, next)=>{
    const quotesArray = quotes; 
    res.send({quotes: quotesArray});
});

// Get a quote by author
app.get('/api/quotes', (req, res, next) => {
    if (!req.query.hasOwnProperty('person')) {
      res.send({quotes: quotes});
    } else {
      console.log(req.query.person)
      const filterQuote = quotes.filter(q => q.person === req.query.person);
      res.send({quotes: filterQuote});
    }
  });

// Create a new quote
app.post('/api/quotes',(req, res, next)=> {
    if(req.query.person && req.query.quote){
        quotes.push({quote: req.query.quote, person: req.query.person})
        res.status(200).send();
    }
    else{
        res.status(400).send();
    }
});


app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`);
});
