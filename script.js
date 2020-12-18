const numberButtons = document.querySelectorAll('[number]')
const operationButtons = document.querySelectorAll('[operation]')
const equalsButton = document.querySelector('[equals]')

const deleteButton = document.querySelector('[delete]')
const clearAllButton = document.querySelector('[clear-all]')
const clearCurrentOperandButton = document.querySelector('[clear-current-operand]')

const signButton = document.querySelector('[sign]')

const previousOperandTextElement = document.querySelector('[previous-operand]')
const currentOperandTextElement = document.querySelector('[current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.resetStatus) {
            calculator.currentOperand = "";
            calculator.resetStatus = false;
        }
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
})

clearAllButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

clearCurrentOperandButton.addEventListener('click', button => {
    calculator.clearCurrentOpertand();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

signButton.addEventListener('click', button => {
    calculator.changeSign();
    calculator.updateDisplay();
})
