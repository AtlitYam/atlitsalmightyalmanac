// Imports
import g from '../genericPanel.js'

// Panel creation function
const createResultsDiv = (parent, results) => {
    g.destroyElements(parent, '.empty-result')
    g.destroyElements(parent, '.result')
    const resultDiv = g.create('div', 'result')

    g.appendChildren(resultDiv, [
        g.createTextDiv('Results:', 'title'),
        createResultGrids(results),
        createResultGoalPossible(results)
    ])

    parent.appendChild(resultDiv)
}

const createEmptyResultsDiv = (parent) => {
    g.destroyElements(parent, '.empty-result')
    g.destroyElements(parent, '.result')
    parent.appendChild(g.create('div', 'empty-result'))
}

// Result functions

const createResultGrids = (results) => {
    return g.appendChildren(g.create('div', 'result-grid-parent'), [
        createResultsNational(results),
        createResultsUniversal(results)
    ])
}

const createResultsNational = (results) => {
    return g.appendChildren(g.create('div', 'result-grid', 'national'), [
        g.createTextDiv('National fragments', 'subtitle', 'national'),
        g.createTextDiv(`You will require ${results.requiredNational} national fragments.`, 'required-fragments', 'national'),
        createResultsRemainingNational(results.remainingNational),
    ])
}

const createResultsUniversal = (results) => {
    return g.appendChildren(g.create('div', 'result-grid', 'universal'), [
        g.createTextDiv('Universal fragments', 'subtitle', 'universal'),
        g.createTextDiv(`You will require ${results.requiredUniversal} universal fragments.`, 'required-fragments', 'universal'),
        createResultsRemainingUniversal(results.remainingUniversal)
    ])
}

const createResultsRemainingNational = (remainingNational) => {
    return remainingNational <= 0
        ? g.createTextDiv(`You will have ${Math.abs(remainingNational)} national fragments remaining.`, 'remaining-fragments', 'national', 'green')
        : g.createTextDiv(`You are lacking ${remainingNational} national fragments.`, 'remaining-fragments', 'national', 'red')
}

const createResultsRemainingUniversal = (remainingUniversal) => {
    return remainingUniversal <= 0
        ? g.createTextDiv(`You will have ${Math.abs(remainingUniversal)} universal fragments remaining.`, 'remaining-fragments', 'universal', 'green')
        : g.createTextDiv(`You are lacking ${remainingUniversal} universal fragments.`, 'remaining-fragments', 'universal', 'red')
}

const createResultGoalPossible = (results) => {
    const isPossibleClass = results.goalPossible ? 'green' : 'red'
    return results.goalPossible
        ? g.createTextDiv('Reaching your goal is possible.', 'goal-possibility', isPossibleClass)
        : g.createTextDiv(`Reaching your goal is not possible.\nYou will be able to reach ${results.maxTier.name}.`, 'goal-possibility', isPossibleClass)
}

export default {
    createResultsDiv,
    createEmptyResultsDiv
}