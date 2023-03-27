const create = (htmlTag, ...classes) => {
    const element = document.createElement(htmlTag)
    addClasses(element, classes)
    return element
}

const createTextDiv = (text, ...classes) => {
    const div = create('div', ...classes)
    div.innerText = text
    addClasses(div, classes)
    return div
}

const createOption = (value) => {
    const option = create('option')
    option.setAttribute('value', value)
    option.textContent = value
    return option
}

const addClasses = (div, classes) => classes.forEach(item => div.classList.add(item))

const appendChildren = (parent, children) => {
    children.forEach(child => parent.appendChild(child))
    return parent
}

const createError = (parent, text) => {
    destroyElements(parent, '.empty-error')
    destroyElements(parent, '.error-message')
    parent.appendChild(createTextDiv(text, 'error-message'))
    parent.addEventListener('change', function () { createEmptyError(parent) }, { once: true })
}

const createEmptyError = (parent) => {
    destroyElements(parent, '.empty-error')
    destroyElements(parent, '.error-message')

    parent.appendChild(create('div', 'empty-error'))
}

const destroyElements = (parent, criteria) => parent.querySelectorAll(criteria).forEach(element => parent.removeChild(element))

export default {
    create: create,
    createTextDiv,
    createOption,
    addClasses,
    appendChildren,
    destroyElements,
    createError,
    createEmptyError
}