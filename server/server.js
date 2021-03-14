//globals
const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const port=5000;
let calc =[];
let lastCalc={};
app.use( express.static('server/public/'));
app.use(bodyParser.urlencoded({extended:true}));

//functions
function calculateTotal(calculateThis){
    let calculatorObject= {
        num1: calculateThis.num1,
        num2: calculateThis.num2,
        operator: calculateThis.operator,
        total: ''
    }//calculatorObject
    if( calculateThis.operator == '+' ){
        calculatorObject.total = Number(calculateThis.num1) + Number(calculateThis.num2);
        return calc.push(calculatorObject);
    }//end if
    else if( calculateThis.operator == '-'){
        calculatorObject.total = calculateThis.num1 - calculateThis.num2;
        return calc.push(calculatorObject);
    }//end else if
    else if( calculateThis.operator == '*'){
        calculatorObject.total = calculateThis.num1 * calculateThis.num2;
        return calc.push(calculatorObject);
    }//end else if
    else if( calculateThis.operator == '/'){
        calculatorObject.total = calculateThis.num1 / calculateThis.num2
        return calc.push(calculatorObject);
    }//end else if
    
}//end calculateTotal
//Get & POST Routes//
app.post('/clear', (req, res)=>{
    console.log('in clear POST');
    calc=[];
})

app.post('/calculated', (req, res)=>{
    console.log('in /calculated POST', req.body)
    let calculateThis =req.body;
    calculateTotal(calculateThis);
    console.log('in calc array', calc)
    res.sendStatus(200);
})

app.get('/lastcalculated', (req, res)=>{
    lastCalc= calc[calc.length-1];
    res.send(lastCalc);
})
app.get('/calculated', (req, res)=>{
    console.log('in /calculated GET');
    res.send(calc);
})

//spin up server
app.listen(port, ()=>{
    console.log('server is up')
} )