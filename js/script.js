let display = document.getElementById("display");
let isDisabled = false;

function appendToDisplay(input) {
    if (isDisabled) return;
    
    if (input === '%') {
        const currentValue = display.value;
        if (!currentValue) {
            display.value = '0.01';
            return;
        }
        const lastChar = currentValue[currentValue.length - 1];
        if (!isNaN(lastChar) || lastChar === '.') {
            const matches = currentValue.match(/([\d\.]+)$/);
            if (matches) {
                const lastNumber = matches[1];
                display.value = currentValue.slice(0, -lastNumber.length) + `(${lastNumber}/100)`;
            }
        } else {
            display.value += '/100';
        }
        return;
    }
    
    let displayChar = input;
    if (input === '*') displayChar = '×';
    if (input === '/') displayChar = '÷';
    
    display.value += displayChar;
}

function clearEverything() {
    if (isDisabled) return;
    display.value = '';
}

function backspace() {
    if (isDisabled) return;
    display.value = display.value.slice(0, -1);
}

function calculate() {
    if (isDisabled || display.value === '') return;
    
    try {
        let expression = display.value;
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        expression = expression.replace(/([\d\.]+)%/g, '($1/100)');
        display.value = eval(expression);
    } catch(error) {
        display.value = "ERROR";
        const calculator = document.querySelector('.container');
        calculator.classList.add('shake');
        isDisabled = true;
        
        setTimeout(() => {
            calculator.classList.remove('shake');
            
            setTimeout(() => {
                display.value = '';
                isDisabled = false;
            }, 1500);
        }, 500);
    }
}