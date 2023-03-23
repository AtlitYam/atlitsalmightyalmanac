// Imports
import g from '../genericPanel.js'

// Panel creation function
const createResultsDiv = (parent, requiredNational = 0, requiredUniversal = 0, remainingNational = 0, remainingUniversal = 0, isGoalPossible = false) => {
    g.destroyElements(parent, '.empty-result')
    g.destroyElements(parent, '.result')
    const result = g.create('div', 'result')

    g.appendChildren(result, [
        g.createTextDiv('Results:', 'title'),
        createResultGrid(requiredNational, requiredUniversal, remainingNational, remainingUniversal, isGoalPossible),
        createResultGoalPossible(isGoalPossible)
    ])

    parent.appendChild(result)
}

const createEmptyResultsDiv = (parent) => {
    g.destroyElements(parent, '.empty-result')
    g.destroyElements(parent, '.result')
    parent.appendChild(g.create('div', 'empty-result'))
}

// Result functions

const createResultGrid = (requiredNational, requiredUniversal, remainingNational, remainingUniversal, isGoalPossible) => {
    return g.appendChildren(g.create('div', 'result-grid'), [
        g.createTextDiv('National fragments', 'subtitle', 'national'),
        g.createTextDiv('Universal fragments', 'subtitle', 'universal'),
        ...createResultsRequired(requiredNational, requiredUniversal),
        ...createResultsRemaining(remainingNational, remainingUniversal, isGoalPossible)
    ])
}

const createResultsRequired = (requiredNational, requiredUniversal) => {
    return [
        g.createTextDiv(`You will require ${requiredNational} national fragments.`, 'required-fragments', 'national'),
        g.createTextDiv(`You will require ${requiredUniversal} universal fragments.`, 'required-fragments', 'universal')
    ]
}

const createResultsRemaining = (remainingNational, remainingUniversal) => {
    return [
        createResultsRemainingNational(remainingNational),
        createResultsRemainingUniversal(remainingUniversal)
    ]
}

const createResultsRemainingNational = (remainingNational) => {
    return remainingNational < 0
        ? g.createTextDiv(`You will have ${Math.abs(remainingNational)} national fragments remaining.`, 'remaining-fragments', 'national', 'green')
        : g.createTextDiv(`You are lacking ${remainingNational} national fragments.`, 'remaining-fragments', 'national', 'red')
}

const createResultsRemainingUniversal = (remainingUniversal) => {
    return remainingUniversal < 0
        ? g.createTextDiv(`You will have ${Math.abs(remainingUniversal)} universal fragments remaining.`, 'remaining-fragments', 'universal', 'green')
        : g.createTextDiv(`You are lacking ${remainingUniversal} universal fragments.`, 'remaining-fragments', 'universal', 'red')
}

const createResultGoalPossible = (possible) => {
    const isPossibleClass = possible ? 'green' : 'red'
    return g.createTextDiv(`Reaching your goal tier ${possible ? 'is' : 'is not'} possible.`, 'goal-possibility', isPossibleClass)
}

export default {
    createResultsDiv,
    createEmptyResultsDiv
}