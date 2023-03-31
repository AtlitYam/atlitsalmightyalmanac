import data from './data.js'

// Input management functions

const addToInput = (input) => data.elements.inputField.innerText = determineNewInput('add', input)

const removeFromInput = () => data.elements.inputField.innerText = determineNewInput('remove')

const clearInput = () => data.elements.inputField.innerText = determineNewInput('clear')

const setInputTo = (input) => data.elements.inputField.innerText = input

const getInput = () => data.elements.inputField.innerText

// Determine new input

const determineNewInput = (action, input = '') => {
    const currentInput = data.elements.inputField.innerText
    switch (action) {
        case 'clear':
            return ''
        case 'remove':
            return currentInput.substring(0, currentInput.length - 1)
        case 'add':
            if (data.operators.includes(currentInput.slice(-1)) && data.operators.includes(input)) {
                if (currentInput.slice(-1) !== input) {
                    return determineNewInput('remove').concat(input)
                } else {
                    return currentInput
                }
            } else {
                return currentInput.concat(input)
            }
    }
}

// Exports

export default {
    addToInput,
    removeFromInput,
    clearInput,
    setInputTo,
    getInput
}