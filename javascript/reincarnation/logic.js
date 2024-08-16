import data from './data.js'

const execute = () => {
    const reincarnationTable = data.reincarnationTable
    const randomIndex = Math.floor(Math.random() * reincarnationTable.length)
    console.log(reincarnationTable[randomIndex])
    return reincarnationTable[randomIndex]
}

export default {
    execute
}