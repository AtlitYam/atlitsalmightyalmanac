import data from './data.js'
import panel from './panel.js'

// Main function
const validate = () =>
    !validateNation() ? panel.createError('Nation is required')
        : !validateTiers() ? panel.createError('Invalid tier selection')
            : !validateUniversals() ? panel.createError('Invalid amount in universal fragments')
                : !validateNationals() ? panel.createError('Invalid amount in national fragments or alternative national fragments')
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