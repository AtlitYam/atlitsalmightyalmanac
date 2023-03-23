// Imports
import data from './data.js'
import validation from './validation.js'
import resultPanel from './resultPanel.js'

// Loading functions

// Execute
const execute = (parent) => {
    data.loadDataFromForm(data)
    if (validation.validate(parent)) {
        const requiredNational = calculateRequiredNationals()
        const requiredUniversal = calculateRequiredUniversals()

        const remainingNational = calculateremainingNationals(requiredNational)
        const remainingUniversal = calculateremainingUniversals(requiredUniversal)

        const possible = isPossible(remainingNational, remainingUniversal)

        resultPanel.createResultsDiv(parent, requiredNational, requiredUniversal, remainingNational, remainingUniversal, possible)
    }
}

// Logic
const calculateRequired = (type) => {
    let currentTier = nextTier(data.startTierValue)
    let total = 0
    let maxReached = false
    while (!maxReached && currentTier.numeric <= data.goalTierValue.numeric) {
        total += type === 'national' ? currentTier.cost.national : currentTier.cost.universal

        currentTier = nextTier(currentTier)
        maxReached = currentTier === undefined
    }
    return total
}

const calculateRequiredNationals = () => calculateRequired('national')
const calculateremainingNationals = (requiredNationals) => requiredNationals - data.nationalFragmentsValue

const calculateRequiredUniversals = () => calculateRequired('universal')
const calculateremainingUniversals = (requiredUniversals) => requiredUniversals - data.universalFragmentsValue

const isPossible = (remainingNational, remainingUniversal) => remainingNational < 0 && remainingUniversal < 0

// Utils

const nextTier = (currentTier) => data.tiers.find(tier => tier.numeric === currentTier.numeric + 1)

export default { execute }