// Imports
import data from './data.js'

// Elements
const mainElement = document.querySelector('.blueprint-calculator')

// Init

window.onload = function () { loadBlueprintCalculator() }

function loadBlueprintCalculator() {
    mainElement.appendChild(createNationSelectDiv())
    mainElement.appendChild(createStartTierSelectDiv())
    mainElement.appendChild(createGoalTierSelectDiv())
    mainElement.appendChild(creatInputNumberFieldsDiv())
    mainElement.appendChild(createSubmitButton())
}

// Div creation functions

const createNationSelectDiv = () => {
    const div = document.createElement("div")
    div.classList.add('nation-select')
    div.appendChild(createTextDiv('Nation'))
    div.appendChild(createNationSelect())
    return div
}

const createStartTierSelectDiv = () => {
    const div = document.createElement("div")
    div.classList.add('start-tier-select')
    div.appendChild(createTextDiv('Tier you\'re starting from'))
    div.appendChild(createTierSelect())
    return div
}

const createGoalTierSelectDiv = () => {
    const div = document.createElement("div")
    div.classList.add('goal-tier-select')
    div.appendChild(createTextDiv('Tier you wish to reach'))
    div.appendChild(createTierSelect())
    return div
}

const creatInputNumberFieldsDiv = () => {
    const div = document.createElement("div")
    div.classList.add('owned-blueprint-inputs')
    div.appendChild(createTextDiv('Universal fragments'))
    div.appendChild(creatInputNumberField('universal'))
    div.appendChild(createTextDiv('National fragments'))
    div.appendChild(creatInputNumberField('national'))
    return div
}

const createSubmitButtonDiv = () => {
    const div = document.createElement("div")
    div.classList.add('submit-button')
    div.appendChild(createSubmitButton())
    return div
}

const createTextDiv = (text, ...classes) => {
    const div = document.createElement("div")
    div.textContent = text
    classes.forEach(item => div.classList.add(item))
    return div
}

// Element creation functions

const createNationSelect = () => {
    const nationSelect = appendChildren(document.createElement("select"), createNationOptions())
    nationSelect.value = ''
    nationSelect.addEventListener('change', function () { createRequiredAltFields(this.value) })
    return nationSelect
}

const createNationOptions = () => data.nations.map(nation => createOption(nation.name))

const createTierSelect = () => appendChildren(document.createElement("select"), createTierOptions())

const createTierOptions = () => data.tiers.map(tier => createOption(tier.name))

const creatInputNumberField = (...classes) => {
    const field = document.createElement("input")
    field.setAttribute("type", "number")
    classes.forEach(item => field.classList.add(item))
    return field
}

const createSubmitButton = () => document.createElement("button")

function createRequiredAltFields(value) {
    const parentElement = document.querySelector(".owned-blueprint-inputs")
    parentElement.querySelectorAll('.altNational').forEach(element => parentElement.removeChild(element))
    data.nations.filter((nation) => nation.name === value).map(nation => nation.altNations.forEach(altNation => {
        console.log(altNation)
        parentElement.appendChild(createTextDiv(`Alternative fragments: ${altNation}`, 'altNational', altNation))
        parentElement.appendChild(creatInputNumberField('altNational', altNation))
    }))
}

// Util functions reusable

function createOption(value) {
    const option = document.createElement("option")
    option.setAttribute("value", value)
    option.textContent = value
    return option
}

function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child))
    return parent
}