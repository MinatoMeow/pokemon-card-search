//Created by Jaimie Clampitt
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

//sdk doesn't support filtering yet
//import TCGdex from '@tcgdex/sdk';

const app = express();
const port = 3000;

//const tcgdex = new TCGdex('en');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res, next) => {
  // test card
  // const response = await axios.get(
  //   'https://api.pokemontcg.io/v2/cards/swsh4-25'
  // );

  try {
    const response = await axios.get(
      'https://api.tcgdex.net/v2/en/cards?name=charizard&id=base'
    );

    const result = response.data;
    res.render('index.ejs', {
      //returns a random charizard card from base set on page load
      card: result[Math.floor(Math.random() * result.length)],
    });

    console.log(result);
  } catch (error) {
    console.error('Failed to make request:', error.message);
    res.render('index.ejs', {
      error: error.message,
    });
  }
});

app.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const name = req.body.name;
    const set = req.body.set;

    var api = `https://api.tcgdex.net/v2/en/cards?name=${name}&id=base${set}`;
    //special handling for mew as it pulls mewtwo as well. * filtering doesn't seem to work
    if (name == 'mew') {
      api = `https://api.tcgdex.net/v2/en/cards?name=eq:${name}&id=base${set}`;

      console.log(name);
    }

    const response = await axios.get(api);
    const result = response.data;
    const undefinedCheck = response.data[0];

    if (undefinedCheck === undefined) {
      //check if no card was returned
      const error = new Error('No card found');
      error.code = '404';
      console.log(result);
      throw error;
    } else if (name === '') {
      console.log(result);
      //returns random base set card if search was empty
      res.render('index.ejs', {
        card: result[Math.floor(Math.random() * result.length)],
      });
    } else {
      result.forEach(getCards);
      var cardAmount = result.length;
      console.log(cardAmount);

      res.render('index.ejs', {
        multiCard: result,
      });
    }
  } catch (error) {
    console.error('Failed to complete request:', error.message);
    res.render('index.ejs', {
      error: 'No cards that match your criteria. Please search again!',
    });
  }
});

function getCards(value) {
  console.log(value);
}

app.get('/readme', function (req, res) {
  res.render('readme.ejs');
});

app.listen(port, () => {});
