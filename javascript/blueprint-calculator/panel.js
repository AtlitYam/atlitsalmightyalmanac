// Imports
import data from './data.js'
import logic from './logic.js'

// Init

const mainElement = document.querySelector('.blueprint-calculator')
window.onload = function () { createBlueprintCalculatorPanel() }

// Panel creation function

const createBlueprintCalculatorPanel = () => {
    mainElement.appendChild(createNationSelectDiv())
    mainElement.appendChild(createStartTierSelectDiv())
    mainElement.appendChild(createGoalTierSelectDiv())
    mainElement.appendChild(creatInputNumberFieldsDiv())
    mainElement.appendChild(createSubmitButtonDiv())
}

// Div creation functions

const createNationSelectDiv = () => {
    const div = document.createElement('div')
    div.classList.add('nation-select')
    div.appendChild(createTextDiv('Nation'))
    div.appendChild(createNationSelect())
    return div
}

const createStartTierSelectDiv = () => {
    const div = document.createElement('div')
    div.classList.add('start-tier-select')
    div.appendChild(createTextDiv('Tier you\'re starting from'))
    div.appendChild(createTierSelect('Tier 1'))
    return div
}

const createGoalTierSelectDiv = () => {
    const div = document.createElement('div')
    div.classList.add('goal-tier-select')
    div.appendChild(createTextDiv('Tier you wish to reach'))
    div.appendChild(createTierSelect('Tier 10'))
    return div
}

const creatInputNumberFieldsDiv = () => {
    const div = document.createElement('div')
    div.classList.add('owned-blueprint-inputs')
    div.appendChild(createTextDiv('Universal fragments'))
    div.appendChild(creatInputNumberField('universal'))
    div.appendChild(createTextDiv('National fragments'))
    div.appendChild(creatInputNumberField('national'))
    return div
}

const createSubmitButtonDiv = () => {
    const div = document.createElement('div')
    div.classList.add('submit-button')
    div.appendChild(createSubmitButton())
    return div
}

const createResultsDiv = (requiredNational = 0, requiredUniversal = 0, remainingNational = 0, remainingUniversal = 0, isGoalPossible = false) => {
    destroyElements(mainElement, '.result')

    const div = document.createElement('div')
    div.classList.add('result')

    div.appendChild(createResultsRequired(requiredNational, requiredUniversal))
    div.appendChild(createResultsRemaining(remainingNational, remainingUniversal, isGoalPossible))
    div.appendChild(createResultGoalPossible(isGoalPossible))

    mainElement.appendChild(div)

    mainElement.addEventListener('change', function () { destroyElements(mainElement, '.result') }, { once: true })
}

const createTextDiv = (text, ...classes) => {
    const div = document.createElement('div')
    div.textContent = text
    classes.forEach(item => div.classList.add(item))
    return div
}

// Element creation functions

const createNationSelect = () => {
    const nationSelect = appendChildren(document.createElement('select'), createNationOptions())
    nationSelect.value = ''
    nationSelect.addEventListener('change', function () { createRequiredAltFields(this.value) })
    return nationSelect
}

const createNationOptions = () => data.nations.map(nation => createOption(nation.name))

const createTierSelect = (defaultValue = '') => {
    const tierSelect = appendChildren(document.createElement('select'), createTierOptions())
    tierSelect.value = defaultValue
    return tierSelect
}

const createTierOptions = () => data.tiers.map(tier => createOption(tier.name))

const creatInputNumberField = (...classes) => {
    const field = document.createElement('input')
    field.setAttribute('type', 'number')
    classes.forEach(item => field.classList.add(item))
    return field
}

const createSubmitButton = () => {
    const button = document.createElement('button')
    button.textContent = 'Calculate'
    button.addEventListener('click', function () { logic.execute() })
    return button
}

const createRequiredAltFields = (value) => {
    const parentElement = mainElement.querySelector('.owned-blueprint-inputs')
    destroyElements(parentElement, '.altNational')
    data.nations.find((nation) => nation.name === value).altNations.forEach(altNation => {
        parentElement.appendChild(createTextDiv(`Alternative fragments: ${altNation}`, 'altNational', altNation))
        parentElement.appendChild(creatInputNumberField('altNational', altNation))
    })
}

const createResultsRequired = (requiredNational, requiredUniversal) => {
    const div = document.createElement('div')
    div.classList.add('required-fragments')

    div.appendChild(createTextDiv(`You will require ${requiredNational} national fragments.`, 'national'))
    div.appendChild(createTextDiv(`You will require ${requiredUniversal} universal fragments.`, 'universal'))

    return div
}

const createResultsRemaining = (remainingNational, remainingUniversal) => {
    const div = document.createElement('div')
    div.classList.add('remaining-fragments')

    div.appendChild(createResultsRemainingNational(remainingNational))
    div.appendChild(createResultsRemainingUniversal(remainingUniversal))

    return div
}

const createResultsRemainingNational = (remainingNational) => {
    return remainingNational < 0
        ? createTextDiv(`You will have ${Math.abs(remainingNational)} national fragments remaining.`, 'national')
        : createTextDiv(`You are lacking ${remainingNational} national fragments.`, 'national')
}

const createResultsRemainingUniversal = (remainingUniversal) => {
    return remainingUniversal < 0
        ? createTextDiv(`You will have ${Math.abs(remainingUniversal)} universal fragments remaining.`, 'universal')
        : createTextDiv(`You are lacking ${remainingUniversal} universal fragments.`, 'universal')
}

const createResultGoalPossible = (possible) => {
    const div = document.createElement('div')
    div.classList.add('goal-possibility')
    div.appendChild(createTextDiv(`Reaching your goal tier ${possible ? 'is' : 'is not'} possible.`, 'text'))
    return div
}

const createError = (text) => {
    const parentElement = mainElement.querySelector('.submit-button')
    destroyElements(parentElement, '.error-message')
    parentElement.appendChild(createTextDiv(text, 'error-message'))
    mainElement.addEventListener('change', function () { destroyElements(parentElement, '.error-message') }, { once: true })
}

// Util functions reusable

const createOption = (value) => {
    const option = document.createElement('option')
    option.setAttribute('value', value)
    option.textContent = value
    return option
}

const appendChildren = (parent, children) => {
    children.forEach(child => parent.appendChild(child))
    return parent
}

const destroyElements = (parentElement, criteria) => parentElement.querySelectorAll(criteria).forEach(element => parentElement.removeChild(element))

export default {
    mainElement,
    createError,
    createResultsDiv
}