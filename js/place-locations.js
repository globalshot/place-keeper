const LOCATIONS_KEY = 'locationDB'

var gLocations = []


reloadLocation()
renderSavedLocations()
function reloadLocation() {
    if (loadFromStorage(LOCATIONS_KEY)) {
        gLocations = loadFromStorage(LOCATIONS_KEY)
    }
}

function addLocations(id) {
    gLocations.push(id)
    updateLocations()
    renderSavedLocations()
}
function removeLocation(locId) {
    const locIdx = gLocations.findIndex(loc => loc === locId)
    removeFromStorage(locId)
    gLocations.splice(locIdx, 1)
    updateLocations()
}

function updateLocations() {
    saveToStorage(LOCATIONS_KEY, gLocations)
}

function onRemoveLocation(ev, locationId) {
    ev.stopPropagation()
    if (!confirm('are you sure you want to delete?')) return
    removeLocation(locationId)
    reloadLocation()
    renderSavedLocations()
}

function renderSavedLocations() {//in todo-controller, try copy line 8,
    // console.log('gLocations',gLocations);
    let strHtmls = ''
    for (let i = 0; i < gLocations.length; i++) {
        let location = loadFromStorage(gLocations[i])
        // console.log('gLocations[i]', gLocations[i]);
        // console.log('loadFromStorage(gLocations[i])',loadFromStorage(gLocations[i+1]));
        // console.log('location', location);
        strHtmls += `<div onclick="onMoveTo(event,'${location.id}')">
        <h3>${location.locName}</h3>    
        <button onclick="onRemoveLocation(event,'${location.id}')">X</button>
        <small>created at '${location.created}'
        </div>`
    }
    let elList = document.querySelector('div.saved-locations')
    elList.innerHTML = strHtmls
    // console.log(strHtmls);
}

function onMoveTo(ev, locId) {
    ev.stopPropagation()
    const elMap = document.querySelector('.map')
    let location = loadFromStorage(locId)
    lat = location.lat
    lng = location.lng
    const options = {
        center: { lat, lng },
        zoom: 20
    }

    const map = new google.maps.Map(
        elMap,
        options
    )

    const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: location.locName
    })

    addOnClick(map)
}