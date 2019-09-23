const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

//drill 1 
app.get('/sum', (req, res) => {
    const {a,b} = req.query;
    //first validation for checking if user provided the query - works
    if(!a){
        return res.status(400).send('Please provide a number for a');
    }
    if(!b){
        return res.status(400).send('Please provide a number for b');
    }
    const numberA = parseFloat(a)
    const numberB = parseFloat(b)
    //second validation for checking is data entered is a number - works
    if(Number.isNaN(numberA)){
        return res.status(400).send('Number isn\'t valid, a must be a number');
    }
    if(Number.isNaN(numberB)){
        return res.status(400).send('Number isn\'t valid, b must be a number');
    }
    const resText = `The sum of ${a} and ${b} = ${numberA + numberB}`;
    res.status(200).send(resText);//added status 200 in after looking at solution
    //console.log(resText);
});

// Drill 2

app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;
    //add validation here
    const base = 'A'.charCodeAt(0);
    const cipher = text.toUpperCase().split('').map(character => {
        const characterCode = character.charCodeAt(0); 
        if(characterCode < base || characterCode > (base + 26)){
            return character
        }
        let difference = characterCode - base;
        difference = difference + parseFloat(shift);
        difference = difference % 26;

        const shiftedCharacter = String.fromCharCode(base + difference);
        return shiftedCharacter;
    })
    const newCipher = cipher.join('');
    res.status(200).send(newCipher);
});

//Drill 3

app.get('/lotto', (req,res) => {
    const arr = req.query.arr;
    let results = 0;
    const lotto = (() => {
      let lottoArray =[];
      for (let i=0;i<6;i++) {
        lottoArray.push(Math.ceil(Math.random()*20))
      }
      return lottoArray; 
    })();
    
    arr.forEach((num) => {
      const index = lotto.findIndex(lottoNum => lottoNum === parseInt(num));
      if (index !== -1) {
        lotto.splice(index, 1, 'words');
        results ++;
      } 
    })
  
    let resultsString = '';
  
    switch(results){
      case 4:
      resultsString = 'Congratulation you win a free ticket!'
      break;
      case 5:
        resultsString = 'Congratulations! You win $100!'
        break;
      case 6:
        resultsString = 'Wow! Unbelievable! You could have won the mega millions!'
        break;
      default:
        resultsString = 'Sorry, you lose'
        break;
    }
    res.send(resultsString);
  })

app.listen(8000, () => {
    console.log('Express server is listening on port 8000');
});