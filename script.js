let CURRENT_OPERATION = null;
let FIRST_NUMBER = null;
let REPLACE_OPERATOR = false;
let DISPLAY = document.querySelector(".display");
let NEW_NUMBER = false;
let ERROR_MESSAGE = 'error';


function updateDisplay(content){
    //se actualiza el texto
    DISPLAY.textContent = content;
}
function cleanInput(input){
    return input.replace(/[^+\-\=\/x]/g, '');
}

function clearDisplay(eraseNumbers = false){
    if(eraseNumbers)FIRST_NUMBER = null;
    DISPLAY.textContent = '';
}
function eraseDisplay(){
    
}
function operate(firstNumber, secondNumber, operator){
    //case switch needs a break line or
    //they might bug
    // replace only takes the operation from string
    switch (cleanInput(operator)){
        case 'x':
            return firstNumber * secondNumber;
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case '/':
            return firstNumber / secondNumber;
        case '=':
            return null;
    }
}

function operatorPressed(operator){
    let secondNumber = parseInt(DISPLAY.textContent);

    //this is made 
    if(CURRENT_OPERATION && cleanInput(CURRENT_OPERATION)=='=')FIRST_NUMBER = false;

    //if there's no firstnumber created, you need
    // to create it with the actual one in display
    if(!FIRST_NUMBER){
        FIRST_NUMBER = secondNumber;
        //NEW_NUMBER : do i need to create another number?
        NEW_NUMBER = true;
        //
        CURRENT_OPERATION = operator.textContent;
    
    //only if you are not expecting a new number, you operate
    // this allows you to change operator without operating
    }else if (!NEW_NUMBER){
        //when there is two numbers, you operate
        let result = operate(parseInt(FIRST_NUMBER),secondNumber,CURRENT_OPERATION);
        clearDisplay(); //clear the display to output result
        updateDisplay(result);
        NEW_NUMBER = true;
        FIRST_NUMBER = result; //and the result will acumulate next operations
        CURRENT_OPERATION = operator.textContent; 
    }else{ //if you are only changing operator, then:
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
