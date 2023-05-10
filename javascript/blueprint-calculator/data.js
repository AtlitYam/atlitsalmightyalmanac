import gd from '../genericData.js'
import init from './init.js'

const nations = [
    { name: 'Germany', altNations: ['Japan'] },
    { name: 'U.S.S.R.', altNations: ['China'] },
    { name: 'U.S.A.', altNations: ['U.K.', 'Poland'] },
    { name: 'France', altNations: ['Czechoslovakia', 'Sweden', 'Italy'] },
    { name: 'U.K.', altNations: ['U.S.A.', 'Poland'] },
    { name: 'China', altNations: ['U.S.S.R.'] },
    { name: 'Japan', altNations: ['Germany'] },
    { name: 'Czechoslovakia', altNations: ['France', 'Sweden', 'Italy'] },
    { name: 'Poland', altNations: ['U.S.A.', 'U.K.'] },
    { name: 'Sweden', altNations: ['France', 'Czechoslovakia', 'Italy'] },
    { name: 'Italy', altNations: ['France', 'Czechoslovakia', 'Sweden'] }
]

const tiers = [
    { name: 'Tier 10', numeric: 10, cost: { national: 168, universal: 528 } },
    { name: 'Tier 9', numeric: 9, cost: { national: 120, universal: 384 } },
    { name: 'Tier 8', numeric: 8, cost: { national: 84, universal: 264 } },
    { name: 'Tier 7', numeric: 7, cost: { national: 60, universal: 184 } },
    { name: 'Tier 6', numeric: 6, cost: { national: 36, universal: 120 } },
    { name: 'Tier 5', numeric: 5, cost: { national: 24, universal: 84 } },
    { name: 'Tier 4', numeric: 4, cost: { national: 12, universal: 48 } },
    { name: 'Tier 3', numeric: 3, cost: { national: 8, universal: 32 } },
    { name: 'Tier 2', numeric: 2, cost: { national: 4, universal: 16 } },
    { name: 'Tier 1', numeric: 1, cost: { national: 0, universal: 0 } }
]

const loadElementsFromForm = (data) => {
    const newData = {
        nationSelect: init.mainElement.querySelector('select.nation-select'),
        startTierSelect: init.mainElement.querySelector('select.start-tier-select'),
        goalTierSelect: init.mainElement.querySelector('select.goal-tier-select'),
        universalBlueprintField: init.mainElement.querySelector('input.blueprint-inputs.universal'),
        nationalBlueprintField: init.mainElement.querySelector('input.blueprint-inputs.national'),
        altNationalBlueprintFields: init.mainElement.querySelectorAll('input.blueprint-inputs.altNational'),
        submitButton: init.mainElement.querySelector('button.submit-button')
    }
    gd.addValuesToObject(data, newData)
}

const loadDataFromForm = (data) => {
    loadElementsFromForm(data)
    const newData = {
        nationValue: nations.find(nation => nation.name === data.nationSelect.value),
        startTierValue: tiers.find(tier => tier.name === data.startTierSelect.value),
        goalTierValue: tiers.find(tier => tier.name === data.goalTierSelect.value),
        universalFragmentsValue: Number(data.universalBlueprintField.value),
        nationalFragmentsValue: Number(data.nationalBlueprintField.value)
            + calculateAltNationals(data)
    }
    gd.addValuesToObject(data, newData)
}

const calculateAltNationals = (data) => Array.from(data.altNationalBlueprintFields).reduce((total, next) => total += Number(Math.floor(next.value / 6)), 0)

export default {
    nations,
    tiers,
    loadDataFromForm
}