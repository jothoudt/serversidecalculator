//globals
const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const port=5000;
let calc =[];
app.use( express.static('server/public/'));
app.use(bodyParser.urlencoded({extended:true}));


function calculateTotal(calculateThis){
    let calculatorObject= {
        num1: calculateThis.num1,
        num2: calculateThis.num2,
        operator: calculateThis.operator,
        total: ''
    }
    if( calculateThis.operator == '+' ){
        calculatorObject.total = Number(calculateThis.num1) + Number(calculateThis.num2);
        return calc.push(calculatorObject)
    }
    else if( calculateThis.operator == '-'){
        calculatorObject.total = calculateThis.num1 - calculateThis.num2;
        return calc.push(calculatorObject)
    }
    else if( calculateThis.operator == '*'){
        calculatorObject.total = calculateThis.num1 * calculateThis.num2;
        return calc.push(calculatorObject)
    }
    else if( calculateThis.operator == '/'){
        calculatorObject.total = calculateThis.num1 / calculateThis.num2
        return calc.push(calculatorObject)
    }
    
}

app.post('/clear', (req, res)=>{
    console.log('in clear POST');
    calc=[];
})

app.post('/calculated', (req, res)=>{
    console.log('in /calculated POST', req.body)
    let calculateThis =req.body;
    calculateTotal(calculateThis);
    console.log('in calc array', calc)
    res.sendStatus(201);
})

app.get('/calculated', (req, res)=>{
    console.log('in /calculated GET');
    res.send(calc);
})

app.listen(port, ()=>{
    console.log('server is up')
} )