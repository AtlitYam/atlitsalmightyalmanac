// Imports
import g from '../genericPanel.js'
import data from './data.js'
import logic from './logic.js'

// Panel creation function

const createBlueprintCalculatorPanel = (parent) => {
    const calculator = g.create('div', 'calculator')

    g.appendChildren(calculator, [
        ...createNationSelect(calculator, 'nation-select'),
        ...createStartTierSelect('start-tier-select'),
        ...createGoalTierSelect('goal-tier-select'),
        ...creatInputNumberFields('blueprint-inputs'),
        createSubmitButton(parent, 'submit-button')
    ])

    parent.appendChild(calculator)
}

// Element creation functions

const createNationSelect = (parent, ...classes) => {
    const nationSelect = g.appendChildren(document.createElement('select'), createNationOptions())
    nationSelect.value = ''
    g.addClasses(nationSelect, classes)
    nationSelect.addEventListener('change', function () { createRequiredAltFields(parent, this.value) })

    return [
        g.createTextDiv('Nation', classes),
        nationSelect
    ]
}

const createStartTierSelect = (...classes) => {
    return [
        g.createTextDiv('Tier you\'re starting from', classes),
        createTierSelect('Tier 1', classes)
    ]
}

const createGoalTierSelect = (...classes) => {
    return [
        g.createTextDiv('Tier you wish to reach', classes),
        createTierSelect('Tier 10', classes)
    ]
}

const creatInputNumberFields = (...classes) => {
    return [
        g.createTextDiv('Universal fragments', classes, 'universal'),
        creatInputNumberField(classes, 'universal'),
        g.createTextDiv('National fragments', classes, 'national'),
        creatInputNumberField(classes, 'national')
    ]
}

const createTierSelect = (defaultValue = '', ...classes) => {
    const tierSelect = g.appendChildren(document.createElement('select'), createTierOptions())
    tierSelect.value = defaultValue
    g.addClasses(tierSelect, classes)
    return tierSelect
}

const creatInputNumberField = (...classes) => {
    const field = g.create('input')
    field.setAttribute('type', 'number')
    g.addClasses(field, classes)
    return field
}

const createSubmitButton = (parent, ...classes) => {
    const button = g.create('button')
    button.textContent = 'Calculate'
    button.addEventListener('click', function () { logic.execute(parent) })
    g.addClasses(button, classes)
    return button
}

const createRequiredAltFields = (parent, value) => {
    console.log(parent)
    g.destroyElements(parent, '.altNational')
    data.nations.find((nation) => nation.name === value).altNations.forEach(altNation => {
        parent.appendChild(g.createTextDiv(`Alternative: ${altNation}`, 'blueprint-inputs', 'altNational', altNation))
        parent.appendChild(creatInputNumberField('blueprint-inputs', 'altNational', altNation))
    })
}

// Element creation helper functions

const createNationOptions = () => data.nations.map(nation => g.createOption(nation.name))

const createTierOptions = () => data.tiers.map(tier => g.createOption(tier.name))

export default {
    createBlueprintCalculatorPanel,
}