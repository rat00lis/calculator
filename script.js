let CURRENT_OPERATION = null;
let FIRST_NUMBER = null;
let DISPLAY = document.querySelector(".display");
let NEW_NUMBER = false;
let ERROR_MESSAGE = 'erroooorr';
const SPACE_DISPLAY = 13;

DISPLAY.addEventListener('keyup', function(event) {
    event.preventDefault();
    const key = event.key;
    if (key=='Enter'){
        operatorPressed(keyObject = {textContent: '='});
        return
    };
    const allowedKeysNumbers = '0123456789'
    const allowedKeysOperators = '.=/+-x'
    if(allowedKeysNumbers.includes(key)){
        const keyObject = {
            textContent: key
        }
        numberPressed(keyObject);
        return;
    }
    else if(allowedKeysOperators.includes(key)){
        const keyObject = {
            textContent: key
        }
        operatorPressed(keyObject);
        return;
    }
});

function formatNumber(number) {

    if(number==Infinity)return ERROR_MESSAGE;
    let textFormOfNumber = number.toString();
    if(textFormOfNumber.length >= SPACE_DISPLAY){
        //first we take care of the decimal part
        //how much space is left for decimals
        let decimalSpaces = SPACE_DISPLAY - textFormOfNumber.split('.')[0].length;
        if (decimalSpaces < 0) decimalSpaces = 0;
        textFormOfNumber = number.toFixed(decimalSpaces).toString();

        //now if it still doesnt fit, we gonna use notation
        if(textFormOfNumber.length >= SPACE_DISPLAY){
            return parseFloat(textFormOfNumber).toExponential();
        }
    }
    // return numberString;
    return textFormOfNumber;
  }
  

function updateDisplay(content){
    //se actualiza el texto
    DISPLAY.textContent = content;
}
function cleanInput(input){
    return input.replace(/[^+\-\.\=\/x0-9]/g, '');
}

function clearDisplay(eraseNumbers = false){
    if(eraseNumbers)FIRST_NUMBER = null;
    DISPLAY.textContent = '';
}
function eraseDisplay(){
    DISPLAY.textContent = DISPLAY.textContent.substring(0,DISPLAY.textContent.length - 1);
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

    try{
        //if the operator is the point, you just add it
        if(cleanInput(operator.textContent)=='.'){
            updateDisplay(DISPLAY.textContent + '.');
            return
        }
        let secondNumber = parseFloat(DISPLAY.textContent);

        //SHOW ERROR IF THERE IS MORE THAN ONE .
        if(DISPLAY.textContent.split('.').length > 2 || toString(FIRST_NUMBER).split('.').length > 2){
            FIRST_NUMBER = null;
            NEW_NUMBER = false;
            CURRENT_OPERATION = null;
            updateDisplay(ERROR_MESSAGE);
            return;
        }

        //this is made so the = works
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
            let result = operate(parseFloat(FIRST_NUMBER),secondNumber,CURRENT_OPERATION);
            clearDisplay(); //clear the display to output result
            updateDisplay(formatNumber(result));
            NEW_NUMBER = true;
            FIRST_NUMBER = result; //and the result will acumulate next operations
            CURRENT_OPERATION = operator.textContent; 
        }else{ //if you are only changing operator, then:
            CURRENT_OPERATION = operator.textContent;
        }
    }
    catch{
        updateDisplay(ERROR_MESSAGE);
    }
}

function numberPressed(number){
    let contentToDisplay = '';
    let numberExtracted = cleanInput(number.textContent);
    let displayNumber = cleanInput(DISPLAY.textContent) || '';

    if(NEW_NUMBER){
        //if you need to make a new number, then you reset
        //the display and 
        contentToDisplay = numberExtracted || '';
        updateDisplay(contentToDisplay);
        NEW_NUMBER = false;
    }else{
        if(cleanInput(DISPLAY.textContent).length >= SPACE_DISPLAY) return;
        contentToDisplay = `${displayNumber}${numberExtracted}`;
        updateDisplay(contentToDisplay);
    }
}

