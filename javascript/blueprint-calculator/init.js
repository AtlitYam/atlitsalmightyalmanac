import g from '../genericPanel.js'
import blueprintCalculatorPanel from './blueprintCalculatorPanel.js'
import resultPanel from './resultPanel.js'

const mainElement = document.querySelector('.blueprint-calculator')
window.onload = function () {
    blueprintCalculatorPanel.createBlueprintCalculatorPanel(mainElement)
    g.createEmptyError(mainElement)
    resultPanel.createEmptyResultsDiv(mainElement)
}

export default { mainElement }