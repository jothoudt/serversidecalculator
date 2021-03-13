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
let operator;
let num1;
let num2;
let calculate={};
function defineOperator(){
    operator=$(this).html()
    console.log(operator);
    return operator;
}

function calculator(){
    calculate ={
        num1: $('#number1').val(),
        num2: $('#number2').val(),
        operator: operator
    }
    console.log(calculate);
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
    displayLastCalculation();
    $('#number1').val('');
    $('#number2').val('');
}

function clearCalculator(){
    console.log('in clearCalculator')
}

function displayLastCalculation(){

    $.ajax({
        url: '/calculated',
        type: 'GET'

    }).then(function(response){
        console.log('back from GET with:', response);
        $('#lastCalculation').empty();
        for(let i=response.length-1; i>=0; i--){
            $('#lastCalculation').append(`
            <p>${response[i].num1}${response[i].operator}${response[i].num2}=${response[i].total}</p>`);
        }
    }).catch(function(err){
        alert('error recieving calculation');
        console.log(err);
    })
}