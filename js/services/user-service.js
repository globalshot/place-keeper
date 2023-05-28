
const PREF_STORAGE_KEY = 'prefDB'

function onSubmit(ev) {
    ev.preventDefault()
    // console.log(ev);
    const elForm = ev.target
    const formData = new FormData(elForm)
    ev.preventDefault()
    const user = Object.fromEntries(formData)
    // console.log(user);
    saveToStorage(PREF_STORAGE_KEY, user)
    // console.log('saved');
    onInit()
}

function onInit() {
    // console.log('loaded');
    var something = loadFromStorage(PREF_STORAGE_KEY)
    console.log(something);
    let elBody = document.querySelector('body')
    elBody.style.backgroundColor = something.bgc
    elBody.style.color = something.txtColor
    let elSpan = document.querySelector('h1.user-welcome')
    elSpan.innerText = 'welcome ' + something.firstName
}

function getSettings() {
    return loadFromStorage(PREF_STORAGE_KEY)
}