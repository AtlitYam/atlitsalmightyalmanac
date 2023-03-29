import calculatorPanel from './calculatorPanel.js'

const mainElement = document.querySelector('.calculator')
window.onload = function () {
    calculatorPanel.createCalculatorPanel(mainElement)
}