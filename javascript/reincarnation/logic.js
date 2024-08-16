import data from './data.js'

const execute = () => {
    const reincarnationTable = data.reincarnationTable
    const randomIndex = Math.floor(Math.random() * reincarnationTable.length)
    return reincarnationTable[randomIndex]
}

export default {
    execute
}