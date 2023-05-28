
const PLACE_STRORAGE_KEY = 'placeDB'
var gId = 0

function onReady() {
    getPosition()
    onInit()
}

function mapReady() {
    console.log('Map is ready')
}

function initMap(lat = 31, lng = 31) {
    // if (!lat) lat = 31
    // if (!lng) lng = 31
    const elMap = document.querySelector('.map')
    // been told to set it alone, but idk

    //oof. welp next time, gotta seperate the lat and lng in startLoc
    // let userSettings = getSettings()

    const options = {
        center: { lat, lng },
        zoom: 16
    }

    const map = new google.maps.Map(
        elMap,
        options
    )

    const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'You are around here'
    })

    addOnClick(map)
}

function addOnClick(map) {
    map.addListener("click", (ev) => {
        console.log(ev.latLng);
        let pos
        // pos = JSON.stringify(ev.latLng.toJSON(), null, 2)
        pos = ev.latLng.toJSON()
        console.log(pos);
        pos.locName = prompt('enter the name of this location')
        if (!pos.locName) return
        _createLocation(pos)
    })
}

function _createLocation(pos) {
    const day = new Date();
    pos.created = day.toString()
    pos.id = makeId()
    saveToStorage(pos.id, pos)
    addLocations(pos.id)
}

function myLocation() {
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
}



function showLocation(position) {
    console.log(position)
    const { latitude: lat, longitude: lng, accuracy } = position.coords
    // document.getElementById("latitude").innerHTML = lat
    // document.getElementById("longitude").innerHTML = lng
    // document.getElementById("accuracy").innerHTML = accuracy

    // var date = new Date(position.timestamp)
    // document.getElementById("timestamp").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    initMap(lat, lng)
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError")

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message
            break
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message
            break
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location."
            break
    }
}

function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }

    // One shot position getting or continues watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
    // navigator.geolocation.watchPosition(showLocation, handleLocationError)
}