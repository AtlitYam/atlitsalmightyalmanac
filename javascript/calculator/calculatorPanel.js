import g from '../genericPanel.js'
import data from './data.js'
import inputHandler from './inputHandler.js'
import logic from './logic.js'

// Main function

const createCalculatorPanel = (parent) => {
    g.appendChildren(parent, [
        ...createNumberButtons(),
        ...createOperatorButtons(),
        ...createGenericButtons(),
        createInputField()
    ])

    window.addEventListener('keydown', function (e) { trigger(e) })
}

// Element creation functions

const createNumberButtons = () => {
    return data.numbers.map(number => createNumberButton(number))
}

const createOperatorButtons = () => {
    return data.operators.map(operator => createOperatorButton(operator))
}

const createGenericButtons = (parent) => {
    return [
        createCalculateButton(parent),
        createRemoveButton(),
        createClearButton()
    ]
}

const createInputField = () => {
    const div = g.create('div', 'input')
    data.addToElements({ inputField: div })
    return div
}

// Util functions

const createNumberButton = (number) => {
    const button = g.create('button', 'number', `${number}`)
    button.innerText = number
    button.addEventListener('click', function () { trigger('number', number) })
    return button
}

const createOperatorButton = (operator) => {
    const button = g.create('button', 'operator', `${operator}`)
    button.innerText = operator
    button.addEventListener('click', function () { trigger('operator', operator) })
    return button
}

const createCalculateButton = () => {
    const calculateButton = g.create('button', 'generic', 'calculate')
    calculateButton.innerText = '='
    calculateButton.addEventListener('click', function () { trigger('execute') })
    return calculateButton
}

const createRemoveButton = () => {
    const removeButton = g.create('button', 'generic', 'remove')
    removeButton.innerText = '<<<'
    removeButton.addEventListener('click', function () { trigger('remove') })
    return removeButton
}

const createClearButton = () => {
    const clearButton = g.create('button', 'generic', 'clear')
    clearButton.innerText = 'Clear'
    clearButton.addEventListener('click', function () { trigger('clear') })
    return clearButton
}

// Triggered functions

const trigger = (event, value) => {
    console.log(event, value)
    if (typeof event === 'string') {
        handleClickEvent(event, value)
    } else {
        handleKeyEvent(event)
    }
}

const handleClickEvent = (event, value) => {
    switch (event) {
        case 'number':
            inputHandler.addToInput(value)
            break;
        case 'operator':
            inputHandler.addToInput(value)
            break;
        case 'remove':
            inputHandler.removeFromInput()
            break;
        case 'clear':
            inputHandler.clearInput()
            break;
        case 'execute':
            logic.execute()
            break;
    }
}

const handleKeyEvent = (event) => {
    switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '+':
        case '-':
        case '/':
        case '*':
            inputHandler.addToInput(event.key)
            break;
        case 'Backspace':
            inputHandler.removeFromInput()
            break;
        case 'Delete':
        case 'Escape':
            inputHandler.clearInput()
            break;
        case 'Enter':
            logic.execute()
            break;

    }
}

// Exports

export default {
    createCalculatorPanel
}