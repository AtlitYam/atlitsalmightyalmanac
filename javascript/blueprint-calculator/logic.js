// Imports
import data from './data.js'
import validation from './validation.js'
import resultPanel from './resultPanel.js'

// Loading functions

// Execute
const execute = (parent) => {
    data.loadDataFromForm(data)
    if (validation.validate(parent)) {
        resultPanel.createResultsDiv(parent, doCalculations())
    }
}

// Logic
const doCalculations = () => {
    return neededTiers().reduce(({ requiredNational, requiredUniversal, goalPossible, maxTier, nationalFragmentsValue, universalFragmentsValue }, currentTier) => ({
        universalFragmentsValue,
        nationalFragmentsValue,
        requiredNational: requiredNational + currentTier.cost.national,
        requiredUniversal: requiredUniversal + currentTier.cost.universal,
        remainingNational: requiredNational + currentTier.cost.national - nationalFragmentsValue,
        remainingUniversal: requiredUniversal + currentTier.cost.universal - universalFragmentsValue,
        goalPossible: isCurrentTierPossible(requiredNational + currentTier.cost.national, requiredUniversal + currentTier.cost.universal),
        maxTier: goalPossible ? currentTier : maxTier
    }), {
        requiredNational: 0,
        requiredUniversal: 0,
        nationalFragmentsValue: data.nationalFragmentsValue,
        universalFragmentsValue: data.universalFragmentsValue
    })
}

// Utils

const isCurrentTierPossible = (national, universal) => national <= data.nationalFragmentsValue && universal <= data.universalFragmentsValue

const neededTiers = () => data.tiers.filter(tier => tier.numeric > data.startTierValue.numeric && tier.numeric <= data.goalTierValue.numeric).reverse()

export default { execute }