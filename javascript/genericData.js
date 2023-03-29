const addValuesToObject = (object, newData) => Object.entries(newData).forEach(([key, value]) => { object[key] = value })

export default {
    addValuesToObject
}