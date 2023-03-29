import g from '../genericPanel.js'
import data from './data.js'
import inputHandler from './inputHandler.js'

// Main function

const createCalculatorPanel = (parent) => {
    g.appendChildren(parent, [
        ...createNumberButtons(),
        ...createOperatorButtons(),
        ...createGenericButtons(parent),
        createInputField()
    ])
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
    button.addEventListener('click', function () { inputHandler.addToInput(number) })
    return button
}

const createOperatorButton = (operator) => {
    const button = g.create('button', 'operator', `${operator}`)
    button.innerText = operator
    button.addEventListener('click', function () { inputHandler.addToInput(operator) })
    return button
}

const createCalculateButton = (parent) => {
    const calculateButton = g.create('button', 'generic', 'calculate')
    calculateButton.innerText = '='
    calculateButton.addEventListener('click', function () { g.createError(parent, 'This function is not implemented yet!') })
    return calculateButton
}

const createRemoveButton = () => {
    const removeButton = g.create('button', 'generic', 'remove')
    removeButton.innerText = '<<<'
    removeButton.addEventListener('click', function () { inputHandler.removeFromInput() })
    return removeButton
}

const createClearButton = () => {
    const clearButton = g.create('button', 'generic', 'clear')
    clearButton.innerText = 'Clear'
    clearButton.addEventListener('click', function () { inputHandler.clearInput() })
    return clearButton
}

// Exports

export default {
    createCalculatorPanel
}