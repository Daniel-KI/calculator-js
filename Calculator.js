/*
Class Calculator

method clearCurrentOpertand() -> Clear last entered value
method clear() -> Clear all entered values
method delete() -> Delete last entered value

method addNumber() -> Add number to display
method chooseOperation() -> Check entered operation
method changeSign() -> Change sign of entered value (+/-)

method calculate() -> Calculate result
method roundNumber() -> Solves problems with decimal numbers
method updateDisplay() -> Display values on page
*/

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.resetStatus = false;
        this.clear();
    }

    clearCurrentOpertand() {
        this.currentOperand = '';
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.resetStatus = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    addNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' && this.operation !== '√' && this.operation != '1/x') {
            return
        }

        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    changeSign() {
        if (this.currentOperand !== '') {
            if (!this.currentOperand.includes('-'))
                this.currentOperand = '-' + this.currentOperand;
            else this.currentOperand = this.currentOperand.replace('-', '');
        }
    }

    roundNumber(number, decimals) {
        var roundedNumber = new Number(number+'').toFixed(parseInt(decimals));
        return parseFloat(roundedNumber); 
    }

    calculate() {
        let result;
        const previosVariable = parseFloat(this.previousOperand);
        const currentVaribale = parseFloat(this.currentOperand);
        if (isNaN(previosVariable) || (isNaN(currentVaribale) && this.operation != '1/x' &&
            this.operation != '√')) return
        switch (this.operation) {
            case '+':
                result = previosVariable + currentVaribale;
                break;
            case '-':
                result = previosVariable - currentVaribale;
                break;
            case '*':
                result = previosVariable * currentVaribale;
                break;
            case '÷':
                result = previosVariable / currentVaribale;
                break;
            case '%':
                result = currentVaribale / previosVariable * 100;
                break;
            case '1/x':
                result = 1 / previosVariable;
                break;
            case '√':
                if (previosVariable.toString().includes('-') == true) {
                    result = 'Ошибка!';
                    break;
                }
                result = Math.sqrt(previosVariable);
                break;
            case '^x':
                result = Math.pow(previosVariable, currentVaribale);
                break;
            default:
                return;
        }
        result = this.roundNumber(result,12);
        this.resetStatus = true;
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            if (this.operation == '√')
                this.previousOperandTextElement.innerText = `${this.operation} ${this.previousOperand}`;
            else if (this.operation == '1/x')
                this.previousOperandTextElement.innerText = `1/${this.previousOperand}`;
            else if (this.operation == '^x')
                this.previousOperandTextElement.innerText = `${this.previousOperand}^`;
            else
                this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}
