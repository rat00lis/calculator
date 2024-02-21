let CURRENT_OPERATION = null;
let FIRST_NUMBER = null;
let SECOND_NUMBER = null;
let DISPLAY = document.querySelector(".display");
let NEW_NUMBER = false;
let ERROR_MESSAGE = 'error';

function addNumbersListeners(){
    let numbers = document.querySelectorAll(".number");
    numbers.forEach(function (number) {
        number.addEventListener('click', () => numberPressed(number));
    });
}

function addOperatorsListeners(){
    let operators = document.querySelectorAll(".operator");
    operators.forEach(function (operator) {
        operator.addEventListener('click', () => operatorPressed(operator));
    });
}

function updateDisplay(content){
    //se actualiza el texto
    DISPLAY.textContent = content;
}

function operate(firstNumber, secondNumber, operator){
    //case switch needs a break line or
    //they might bug
    // replace only takes the operation from string
    switch (operator.replace(/[^+\-\/x]/g, '')){
        case 'x':
            return firstNumber * secondNumber;
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case '/':
            return firstNumber / secondNumber;
    }
}

function clearDisplay(){
    DISPLAY.textContent = '';
}

function operatorPressed(operator){
    let secondNumber = parseInt(DISPLAY.textContent);
    
    //if there's no firstnumber created, you need
    // to create it with the actual one in display
    if(!FIRST_NUMBER){
        FIRST_NUMBER = secondNumber;
        //NEW_NUMBER : do i need to create another number?
        NEW_NUMBER = true;
        //
        CURRENT_OPERATION = operator.textContent;
    }else{
        //when there is two numbers, you operate
        let result = operate(parseInt(FIRST_NUMBER),secondNumber,CURRENT_OPERATION);
        clearDisplay(); //clear the display to output result
        updateDisplay(result);
        NEW_NUMBER = true;
        FIRST_NUMBER = result; //and the result will acumulate next operations
        CURRENT_OPERATION = operator.textContent; 
    }
}

function numberPressed(number){

    let contentToDisplay = '';
    let numberExtracted = parseInt(number.textContent);
    let displayNumber = parseInt(DISPLAY.textContent) || '';

    if(NEW_NUMBER){
        //if you need to make a new number, then you reset
        //the display and 
        contentToDisplay = numberExtracted || '';
        updateDisplay(contentToDisplay);
        NEW_NUMBER = false;
    }else{
        contentToDisplay = `${displayNumber}${numberExtracted}`;
        updateDisplay(contentToDisplay);
    }
}
addNumbersListeners();
addOperatorsListeners();