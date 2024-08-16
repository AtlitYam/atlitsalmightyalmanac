import data from './data.js'

const execute = () => {
    const randomIndex = Math.floor(Math.random() * arr.length)
    console.log(data.reincarnationTable[randomIndex])
    return data.reincarnationTable[randomIndex]
}

export default [
    execute
]