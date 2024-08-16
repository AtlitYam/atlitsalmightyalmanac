import reincarnation from './reincarnation.js'

const mainElement = document.querySelector('.reincarnation')
window.onload = function () {
    reincarnation.run(mainElement)
}

export default { mainElement }