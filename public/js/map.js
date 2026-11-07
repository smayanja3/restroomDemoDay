

async function addPins() {
    // 
    const [{ AdvancedMarkerElement }, { InfoWindow }] = await Promise.all([
        google.maps.importLibrary('marker'),
        google.maps.importLibrary('maps'),
    ])

    const mapElement = document.querySelector('gmp-map')

    // ask my SERVER/ DB for the restrooms
    const response = await fetch('/api/restrooms')
    const restrooms = await response.json()

    //one restroom when clicked popup box
    const popup = new InfoWindow()

    // creating the pin for each restroom
    restrooms.forEach(restroom => {
        const pin = new AdvancedMarkerElement({
            position: { lat: restroom.lat, lng: restroom.lng },
            title: restroom.name,
        })
        // Google's style: the pin goes inside <gmp-map>
        mapElement.append(pin)
        // addListener = google addEventListener also setContent = google maps textContent
        pin.addListener('click', () => {
            // builds the restroom info box 
            popup.setContent(makePopup(restroom))
            popup.open({ anchor: pin, map: mapElement.innerMap })
        })
    })
}
addPins().catch(err => console.log('Could not load pins:', err))