//globals
const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const port=5000;
let total= 0;
let calc =[];
app.use( express.static('server/public/'));
app.use(bodyParser.urlencoded({extended:true}));

/*
function calculateTotal(calculateThis){
    let calculatorObject= {
        num1: calculateThis.num1,
        num2: calculateThis.num2,
        total: ''
    }
    if( calculateThis.operator == '+' ){
        total = Number(calculateThis.num1) + Number(calculateThis.num2);
    }
    else if( calculateThis.operator == '-'){
        total = calculateThis.num1 - calculateThis.num2;
    }
    else if( calculateThis.operator == '*'){
        total = calculateThis.num1 * calculateThis.num2;
    }
    else if( calculateThis.operator == '/'){
        total = calculateThis.num1 / calculateThis.num2
    }
    return calc.push(calculatorObject)
}*/


app.post('/calculated', (req, res)=>{
    console.log('in /calculated POST', req.body)
    // let calculateThis =rec.body;
    // calculateTotal(calculateThis);
    console.log('in calc array', calc)
    res.sendStatus(201);
})

app.listen(port, ()=>{
    console.log('server is up')
} )