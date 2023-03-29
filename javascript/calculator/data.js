import gD from '../genericData.js'

// Fixed data declerations
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const operators = ['+', '-', '*', '/']

// Element declarations
const addToElements = (newElements) => {
    gD.addValuesToObject(elements, newElements)
}

const elements = {}

// Exports

export default {
    numbers,
    operators,
    addToElements,
    elements
}