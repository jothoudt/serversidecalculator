$(document).ready(readyNow);

function readyNow(){
    console.log('JQ')
$('#addButton').on('click', defineOperator);
$('#subtractButton').on('click', defineOperator);
$('#multiplyButton').on('click', defineOperator);
$('#divideButton').on('click', defineOperator);
$('#equalsButton').on('click', calculator)
$('#clearButton').on('click', clearCalculator);
}
//define global
let operator;
let num1;
let num2;
let calculate={};
let lastCalc;

//function to set operator
function defineOperator(){
    operator=$(this).html()
    console.log(operator);
    return operator;
}//end defineOperator

//function to send info to be calculated
function calculator(){
    //object to POST
    calculate ={
        num1: $('#number1').val(),
        num2: $('#number2').val(),
        operator: operator
    }//end object to calculate
    console.log(calculate);
    //POST Route
    $.ajax({
        type: 'POST',
        url: '/calculated',
        data: calculate
    }).then(function(response){
        console.log('back from Post with', response)
    }).catch(function(err){
        alert('error calculating')
    })
    console.log('in calculate');
    //call to display calculation
    displayCalculation();
    displayPastCalculation();
    //empty values
    $('#number1').val('');
    $('#number2').val('');
}//end calculator

//function to clear calculations
function clearCalculator(){
    console.log('in clearCalculator');
    //POST route to empty array
    $.ajax({
        type:'POST',
        url: '/clear'
    }).then(function(response){
        console.log('calculator cleared');
    }).catch(function(err){
        alert('error clearing calculations');
        console.log(err);
    })
    $('#pastCalculation').empty();
    $('#currentCalculation').empty();
}//end clearCalculator

//functin to display calculations
function displayPastCalculation(){
    //GET route to gather info to display to DOM
    $.ajax({
        url: '/calculated',
        type: 'GET'

    }).then(function(response){
        console.log('back from GET with:', response);
        $('#pastCalculation').empty();
        $('#pastCalculation').append(' <h5><u>Past Calculations</u></h5>')
        for(let i=response.length-1; i>=0; i--){
            $('#pastCalculation').append(`
            <ul>
              <li>${response[i].num1}${response[i].operator}${response[i].num2}
                =${response[i].total}</li>
            </ul>`);
        }
    }).catch(function(err){
        alert('error recieving calculation');
        console.log(err);
    })
}//end displayLastCalculation

function displayCalculation(){
    $.ajax({
        url: '/lastCalculated',
        type: 'GET'
    }).then(function(response){
        $('#currentCalculation').empty();
        $('#currentCalculation').append(`<h2>${response.num1}${response.operator}${response.num2}=${response.total}</h2`)
    }).catch(function(err){
        alert('error last calculation');
        console.log(err);
    })
}//end displayCalculations functions