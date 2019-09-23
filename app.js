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
    res.send(resText);
    //console.log(resText);
});

// Drill 2

app.get('/cypher', (req, res) => {
    const { text, shift } = req.query;
    const result = ''
    for (let i= 0; i <= text.length; i++) {
        results += String.fromCharCode(text.charCodeAt(i) + parseFloat(shift));
    }
    res.send(result);

})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000');
});