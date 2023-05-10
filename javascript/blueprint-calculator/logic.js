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
    const startTier = data.startTierValue
    const goalTier = data.goalTierValue
    const availableNational = data.nationalFragmentsValue
    const availableUniversal = data.universalFragmentsValue
    let resultValues = {
        requiredNational: calculateNeededNational(startTier, goalTier, availableNational),
        requiredUniversal: calculateNeededUniversal(startTier, goalTier, availableUniversal),
        remainingNational: calculateRemainingNational(startTier, goalTier, availableNational),
        remainingUniversal: calculateRemainingUniversal(startTier, goalTier, availableUniversal),
    }

    if (calculateTierReachable(startTier, goalTier, availableNational, availableUniversal)) {
        return {
            ...resultValues,
            goalPossible: true
        }
    } else {
        return {
            ...resultValues,
            maxTier: calculateMaximumPossibleTier(startTier, goalTier, availableNational, availableUniversal),
            goalPossible: false
        }
    }
}

// Utils

const calculateTierReachable = (startTier, goalTier, availableNational, availableUniversal) => calculateNeededNational(startTier, goalTier) <= availableNational && calculateNeededUniversal(startTier, goalTier) <= availableUniversal // Bool

const calculateRemainingNational = (startTier, goalTier, availableNational) => availableNational - calculateNeededNational(startTier, goalTier) // Number

const calculateRemainingUniversal = (startTier, goalTier, availableUniversal) => availableUniversal - calculateNeededUniversal(startTier, goalTier) // Number

const calculateNeededNational = (startTier, goalTier) => goalTier.cost.national - startTier.cost.national // Number

const calculateNeededUniversal = (startTier, goalTier) => goalTier.cost.universal - startTier.cost.universal // Number

const calculateMaximumPossibleTier = (startTier, goalTier, availableNational, availableUniversal) => { // Tier
    for (const tier of neededTiers(startTier, goalTier)) {
        if (calculateTierReachable(startTier, tier, availableNational, availableUniversal)) {
            return tier
        }
    }
}

const neededTiers = (startTier, goalTier) => data.tiers.filter(tier => tier.numeric > startTier.numeric && tier.numeric <= goalTier.numeric) // Array of Tiers

export default { execute }