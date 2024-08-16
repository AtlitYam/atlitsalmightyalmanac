import g from '../genericPanel.js'
import data from './data.js'
import logic from './logic.js'

const run = (parent) => {
    g.appendChildren(parent, createSubmitButton(parent, 'submit-button'))
}

const createSubmitButton = (parent, ...classes) => {
    const button = g.create('button')
    button.textContent = 'Find your new race!'
    button.addEventListener('click', function () { logic.execute(parent) })
    g.addClasses(button, classes)
    return button
}

export default {
    run,
}