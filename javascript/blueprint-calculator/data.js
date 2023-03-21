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
    { name: 'Tier 10', cost: { national: 48, universal: 144 } },
    { name: 'Tier 9', cost: { national: 36, universal: 120 } },
    { name: 'Tier 8', cost: { national: 24, universal: 80 } },
    { name: 'Tier 7', cost: { national: 24, universal: 64 } },
    { name: 'Tier 6', cost: { national: 12, universal: 36 } },
    { name: 'Tier 5', cost: { national: 12, universal: 36 } },
    { name: 'Tier 4', cost: { national: 4, universal: 16 } },
    { name: 'Tier 3', cost: { national: 4, universal: 16 } },
    { name: 'Tier 2', cost: { national: 4, universal: 16 } },
    { name: 'Tier 1', cost: { national: 0, universal: 0 } }
]

export default { nations, tiers }