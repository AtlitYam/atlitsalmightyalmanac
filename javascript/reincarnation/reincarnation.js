import g from '../genericPanel.js'
import logic from './logic.js'

const run = (parent) => {
    g.appendChildren(parent, [createSubmitButton(parent, 'submit-button')])
}

const createSubmitButton = (parent, ...classes) => {
    const button = g.create('button')
    button.textContent = 'Find your new race!'
    button.addEventListener('click', function () { createResultPanel(parent, logic.execute()) })
    g.addClasses(button, classes)
    return button
}

const createResultPanel = (parent, result) => {
    g.destroyElements(parent, '.result')
    const resultPanel = g.createTextDiv('result', 'result')
    resultPanel.textContent = result
    g.appendChildren(parent, [resultPanel])
}

export default {
    run
}