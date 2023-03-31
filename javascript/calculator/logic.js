import inputHandler from "./inputHandler.js"

// Main function

const execute = () => {
    inputHandler.setInputTo(splitInput().reduce(({ total, currentOperator }, value) => (
        calculate(total, currentOperator, value)
    ), {
        total: 0,
        currentOperator: '+'
    }).total
    )
}

const calculate = (total, currentOperator, value) => {
    let newTotal = total
    let newOperator = currentOperator
    console.log(total, currentOperator, value)
    if (typeof value === 'number') {
        console.log(`${value} is a number`)
        switch (currentOperator) {
            case '+':
                console.log(total + value)
                newTotal = total + value
                return { total: newTotal, currentOperator: newOperator }
            case '-':
                console.log(total + value)
                newTotal = total - value
                return { total: newTotal, currentOperator: newOperator }
            case '*':
                newTotal = total * value
                return { total: newTotal, currentOperator: newOperator }
            case '/':
                newTotal = total / value
                return { total: newTotal, currentOperator: newOperator }
        }

    }
    else {
        console.log(`${value} is an operator`)
        newOperator = value
        return { total: newTotal, currentOperator: newOperator }
    }
}

// Util functions

const splitInput = () => {
    return inputHandler.getInput().split('').reduce(function (sumArray, value) {
        if (sumArray.length === 0) {
            sumArray.push(Number(value))
        }
        else if (typeof sumArray[sumArray.length - 1] === 'string' && sumArray[sumArray.length - 1].slice(-1) === '.') {
            appendNumberOrAddNew(sumArray, value)
        }
        else {
            Number(value) >= 0 || value === '.' ? appendNumberOrAddNew(sumArray, value) : sumArray.push(value)
        }
        return sumArray
    }, [])
}

const appendNumberOrAddNew = (sumArray, value) => {
    console.log(value)
    if (value === '.') {
        console.log('dot')
        console.log(value, sumArray[sumArray.length - 1])
        sumArray[sumArray.length - 1] = sumArray[sumArray.length - 1] + value + ''
    } else if (typeof sumArray[sumArray.length - 1] === 'string' && sumArray[sumArray.length - 1].slice(-1) === '.') {
        console.log('previous was dot')
        sumArray[sumArray.length - 1] = Number(sumArray[sumArray.length - 1] + value + '')
    } else if (typeof sumArray[sumArray.length - 1] === 'number') {
        console.log('number')
        console.log(value, sumArray[sumArray.length - 1])
        sumArray[sumArray.length - 1] = Number(sumArray[sumArray.length - 1] + value + '')
    }
    else {
        console.log('other')
        console.log(value, sumArray[sumArray.length - 1])
        sumArray.push(Number(value))
    }
}

// Exports

export default {
    execute
}