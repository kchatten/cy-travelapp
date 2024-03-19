InitialzieGoogleMaps();

// TODO: Solve no map panning

function InitialzieGoogleMaps() { // This is the super function to control timing.
    console.log('Initializing Google Maps...')
    GoogleMapScript().then(() => { // 1. Load the Google Maps API script.
        PromptUserLocation();  // 2. Ask the user to share their location.
    }).catch(error => {
        console.log('ERR: ', err);
    });
}


function PromptUserLocation() { // This is the function to prompt the user to shair their location, and handling what happens when they accept or reject that request.
   
    console.log('Prompting user to share their location...')
    
    navigator.geolocation.getCurrentPosition(Accepted, Rejected); // This prompts the user to share their location. If they agree, it runs Accepted defined below. If they reject the request it runs Rejected.

    let mapCover = document.getElementById('map-cover') // Defining the mapCover here so that it is accessbile to the following functions.

    async function Accepted(userLocation) { // Handle the user accepting our request to share location.
        console.log('Accepted!')
        const uLat = userLocation.coords.latitude;
        const uLng = userLocation.coords.longitude;
        console.log(uLat);
        console.log(uLng);

        InitMap(uLat, uLng);
        mapCover.style.opacity = 0; // Hide the map cover.
    }

    function Rejected() { // Handle the user rejecting our request to share location.

        console.log('Rejected!');

        let mapContainer = document.getElementById('map-container'); // As we are covering the map, it makes sense to add it to the map container.
        mapContainer.appendChild(mapCover);

        const input = document.getElementById('pac-input'); // Grab the input element that we wish to be our address lookup.
        const options = {                                   // Define the options of our Autocomplete.
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
        };

        const autocomplete = new google.maps.places.Autocomplete(input, options); // Define a new autocomplete element where the input we defined earlier as the input element and the options we defined earlier as the options.
        autocomplete.setFields(["place_id", "geometry", "name"]);
        autocomplete.addListener("place_changed", function () {
            const place = autocomplete.getPlace();
            let uLat = place.geometry.location.lat();
            let uLng = place.geometry.location.lng();       
            
            InitMap(uLat, uLng)
            mapCover.style.opacity = 0; // Hide the map cover.
        });   
    }
}


// Load Google Maps JavaScript API with callback InitMap
function GoogleMapScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBCNMmGTLxMf8aHpv36vIcifMsnEX-MWMo&libraries=places&loading=async&callback=InitMap";
        document.head.appendChild(script);

        script.onload = resolve;         // Resolve the promise once the script has loaded
        script.onerror = reject;         // Reject the promise if it doesn't
    });
}


window.InitMap = async function (uLat, uLng) {
    if (uLat !== undefined && uLng !== undefined) {
        let map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: uLat, lng: uLng },
            zoom: 16,
            disableDefaultUI: true,
        });
    } else {
        console.warn("User location not yet retrieved.");
    }
};