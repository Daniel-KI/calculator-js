/*
Class Calculator

method clearCurrentOpertand() -> Clear last entered value
method clear() -> Clear all entered values
method delete() -> Delete last entered value

method addDot() -> Add dot to current value
method addNumber() -> Add number to current value
method chooseOperation() -> Check entered basic operation
method changeSign() -> Change sign of entered value (+/-)

method calculate() -> Calculate result
method roundNumber() -> Round result to chosen decimals (solves problems with decimal)
method updateDisplay() -> Display values on page
*/

class Calculator {

    constructor() {
        this.resetStatus = false;
        this.currentOperand = undefined;
        this.previousOperand = undefined;
        this.operation = undefined;
        this.result = undefined;

        this.listeners();
        this.clear();
    }

    roundNumber(number, decimals) {
        var roundedNumber = new Number(number + '').toFixed(parseInt(decimals));
        return parseFloat(roundedNumber);
    }
    checkValue(value){
        if(isNaN(value) || value === Infinity) return "Ошибка!";
        else return value;
    }

    clearCurrentOpertand() {
        this.currentOperand = '';
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.resetStatus = false;
        this.updateDisplay();
    }

    delete() {
        if(!isNaN(this.currentOperand)){
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
            this.updateDisplay();
        }
    }

    changeSign() {
        if (this.currentOperand !== '' && !isNaN(this.currentOperand) && this.currentOperand !== '0') {
            if (!this.currentOperand.toString().includes('-'))
                this.currentOperand = '-' + this.currentOperand;
            else this.currentOperand = this.currentOperand.replace('-', '');
        }
        this.updateDisplay();
    }

    addDot(num) {
        if (this.currentOperand.includes('.')) return;
        if (this.currentOperand == null || this.currentOperand == '') {
            this.currentOperand = '0.';
        }
        else if (!isNaN(this.currentOperand)) this.currentOperand = this.currentOperand.toString() + '.';
        this.updateDisplay();
    }

    addNumber(number) {
        if (this.currentOperand[0] == '0' && !this.currentOperand.includes('.')) {
            if (number != '0'){
                this.currentOperand = number;
                return;
            }
            else return;
        }
        if(isNaN(this.currentOperand)) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand == '' || isNaN(this.currentOperand)) {
            return;
        }
        else {
            if (this.previousOperand !== '') {
                this.calculate(operation);
            }
        }
        this.operation = operation;
        this.previousOperand = this.roundNumber(this.currentOperand, 12); //remove extra zeros in decimal numbers
        this.currentOperand = '';
    
        this.updateDisplay();
    }

    calculate(operation) {
        const previosVariable = parseFloat(this.previousOperand);
        const currentVaribale = parseFloat(this.currentOperand);

        if (isNaN(previosVariable) || isNaN(currentVaribale)) return; //если предыдущее значение или текущее не число или пустое

        switch (this.operation) {
            case '+':
                this.result = previosVariable + currentVaribale;
                break;
            case '-':
                this.result = previosVariable - currentVaribale;
                break;
            case '*':
                this.result = previosVariable * currentVaribale;
                break;
            case '/':
                this.result = previosVariable / currentVaribale;
                break;
            case '^':
                this.result = Math.pow(previosVariable, currentVaribale);
                break;

            case '√':
                this.result = Math.sqrt(currentVaribale);
                return;
            case '1/':
                this.result = 1 / currentVaribale;
                return;
            case '%':
                this.result = currentVaribale / 100;
                return;

            default:
                return;
        }
        this.setResult();
        this.updateDisplay();
    }

    calculatePriorityOperation(priorityOperation){
        
        const currentVaribale = parseFloat(this.currentOperand);

        if (isNaN(currentVaribale)) return;
        
        switch(priorityOperation){
            case '√':
                this.result =  Math.sqrt(this.currentOperand);
                break;
            case '1/':
                this.result = 1 / this.currentOperand;
                break;
            case '%':
                this.result = this.currentOperand / 100;
                break;
            default:
                return;
        }

        const currentOperandTextElement = document.querySelector('[current-operand]');
        const previousOperandTextElement = document.querySelector('[previous-operand]');
        
        if(this.operation !=undefined){
            previousOperandTextElement.innerText = `${this.previousOperand}${this.operation}${priorityOperation}${this.currentOperand}`;
        }
        else{
            previousOperandTextElement.innerText = `${priorityOperation}${this.currentOperand}`;
        }
        
        this.currentOperand = this.checkValue(this.roundNumber(this.result, 12));
        currentOperandTextElement.innerText = this.currentOperand;
    }

    setResult() {
        this.resetStatus = true;
        this.currentOperand = this.checkValue(this.roundNumber(this.result, 12));
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        const previousOperandTextElement = document.querySelector('[previous-operand]');
        const currentOperandTextElement = document.querySelector('[current-operand]');

        currentOperandTextElement.innerText = this.currentOperand;

        if (this.operation != undefined) {
            previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else {
            previousOperandTextElement.innerText = '';
        }
    }

    listeners() {
        const numberButtons = document.querySelectorAll('[number]');
        const dotButton = document.querySelector('[dot]')
        const operationButtons = document.querySelectorAll('[operation]');
        const equalsButton = document.querySelector('[equals]');

        const deleteButton = document.querySelector('[delete]');
        const clearAllButton = document.querySelector('[clear-all]');
        const clearCurrentOperandButton = document.querySelector('[clear-current-operand]');

        const signButton = document.querySelector('[sign]');

        const priorityOperationButtons = document.querySelectorAll('[priority-operation]');

        priorityOperationButtons.forEach(button =>{
            button.addEventListener('click',()=>{
                this.calculatePriorityOperation(button.innerText);
            })
        })
       
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOperation(button.innerText);
            })
        })
        
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.resetStatus) {
                    calculator.currentOperand = "";
                    calculator.resetStatus = false;
                }
                calculator.addNumber(button.innerText);
            })
        })

        equalsButton.addEventListener('click', button => {
            calculator.calculate();
        })

        clearAllButton.addEventListener('click', button => {
            calculator.clear();
        })

        clearCurrentOperandButton.addEventListener('click', button => {
            calculator.clearCurrentOpertand();
        })

        deleteButton.addEventListener('click', button => {
            calculator.delete();
        })

        signButton.addEventListener('click', button => {
            calculator.changeSign();
        })

        dotButton.addEventListener('click', button => {
            calculator.addDot();
        })
    }
}

