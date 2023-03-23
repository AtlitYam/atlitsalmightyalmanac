import g from '../genericPanel.js'
import data from './data.js'

// Main function
const validate = (parent) =>
    !validateNation() ? g.createError(parent, 'Nation is required')
        : !validateTiers() ? g.createError(parent, 'Invalid tier selection')
            : !validateUniversals() ? g.createError(parent, 'Invalid amount in universal fragments')
                : !validateNationals() ? g.createError(parent, 'Invalid amount in national fragments or alternative national fragments')
                    : true

// Sub functions

const validateNation = () => {
    console.log('Validated nation')
    return data.nationValue
}

const validateTiers = () => {
    console.log('Validated tiers')
    return data.startTierValue.numeric < data.goalTierValue.numeric
}

const validateUniversals = () => {
    console.log('Validated universals')
    return data.universalFragmentsValue > 0
}

const validateNationals = () => {
    console.log('Validated nationals')
    return data.nationalFragmentsValue > 0
}

export default {
    validate
}