import panel from './panel.js'

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
    { name: 'Tier 10', numeric: 10, cost: { national: 48, universal: 144 } },
    { name: 'Tier 9', numeric: 9, cost: { national: 36, universal: 120 } },
    { name: 'Tier 8', numeric: 8, cost: { national: 24, universal: 80 } },
    { name: 'Tier 7', numeric: 7, cost: { national: 24, universal: 64 } },
    { name: 'Tier 6', numeric: 6, cost: { national: 12, universal: 36 } },
    { name: 'Tier 5', numeric: 5, cost: { national: 12, universal: 36 } },
    { name: 'Tier 4', numeric: 4, cost: { national: 4, universal: 16 } },
    { name: 'Tier 3', numeric: 3, cost: { national: 4, universal: 16 } },
    { name: 'Tier 2', numeric: 2, cost: { national: 4, universal: 16 } },
    { name: 'Tier 1', numeric: 1, cost: { national: 0, universal: 0 } }
]

const loadElementsFromForm = (data) => {
    const newData = {
        nationSelect: panel.mainElement.querySelector('.nation-select select'),
        startTierSelect: panel.mainElement.querySelector('.start-tier-select select'),
        goalTierSelect: panel.mainElement.querySelector('.goal-tier-select select'),
        universalBlueprintField: panel.mainElement.querySelector('.owned-blueprint-inputs input.universal'),
        nationalBlueprintField: panel.mainElement.querySelector('.owned-blueprint-inputs input.national'),
        altNationalBlueprintFields: panel.mainElement.querySelectorAll('.owned-blueprint-inputs input.altNational'),
        submitButton: panel.mainElement.querySelector('.submit-button button')
    }
    addValuesToObject(data, newData)
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
    addValuesToObject(data, newData)
}

const addValuesToObject = (object, newData) => Object.entries(newData).forEach(([key, value]) => { object[key] = value })

const calculateAltNationals = (data) => Array.from(data.altNationalBlueprintFields).reduce((total, next) => total += Number(Math.floor(next.value / 6)), 0)

export default {
    nations,
    tiers,
    loadDataFromForm
}