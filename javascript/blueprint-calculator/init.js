import g from '../genericPanel.js'
import calculatorPanel from './calculatorPanel.js'
import resultPanel from './resultPanel.js'

const mainElement = document.querySelector('.blueprint-calculator')
window.onload = function () {
    calculatorPanel.createBlueprintCalculatorPanel(mainElement)
    g.createEmptyError(mainElement)
    resultPanel.createEmptyResultsDiv(mainElement)
}

export default { mainElement }