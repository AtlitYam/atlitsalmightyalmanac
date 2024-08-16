import data from './data.js'

const execute = (parent) => {
    const reincarnationTable = data.reincarnationTable
    const randomIndex = Math.floor(Math.random() * reincarnationTable.length)
    console.log(reincarnationTable[randomIndex])
    return reincarnationTable[randomIndex]
}

export default {
    execute
}