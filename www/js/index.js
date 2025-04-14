document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('DOMContentLoaded', onDeviceReady, false);

function onDeviceReady() {
    if (window.cordova) {
        console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    }
    document.getElementById('deviceready')?.classList.add('ready');
    document.addEventListener('init', function (event) {
        var page = event.target;
        if (page.id === 'homePage') {
            loadTrips();
        } else if (page.id === 'savedPage') {
            loadSavedTrips();
        }
    });
}

function saveTrip() {
    const destination = document.getElementById('destination').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const date = document.getElementById('trip-date').value;
    const time = document.getElementById('trip-time').value;

    if (!destination || !notes || !date || !time) {
        ons.notification.alert('Please fill in all fields.');
        return;
    }

    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips.push({ destination, notes, date, time });
    localStorage.setItem('trips', JSON.stringify(trips));

    ons.notification.toast('Trip saved!', { timeout: 2000 });
const homePage = document.querySelector('#homePage');
if (homePage) {
    loadTrips();
}
document.querySelector('#myNavigator').popPage();
}

function loadTrips() {
    const tripList = document.getElementById('trip-list');
    tripList.innerHTML = '';

    const trips = JSON.parse(localStorage.getItem('trips')) || [];

    if (trips.length === 0) {
        tripList.innerHTML = '<ons-list-item>No trips yet.</ons-list-item>';
        return;
    }
    trips.forEach((trip, index) => {
        let listItem = document.createElement('ons-list-item');
        listItem.innerHTML = `
  <div class="trip-item">
    <div class="trip-info">
      <div class="trip-destination">${trip.destination}</div>
      <div class="trip-notes">${trip.notes}</div>
      <div class="trip-date">${trip.date} ${trip.time}</div>
    </div>
    <div class="right">
      <ons-icon icon="md-delete" style="cursor:pointer" onclick="deleteTrip(${index})"></ons-icon>
    </div>
  </div>
`;
        tripList.appendChild(listItem);
    });
}

function deleteTrip(index) {
    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips.splice(index, 1);
    localStorage.setItem('trips', JSON.stringify(trips));
    loadTrips();
}


    function loadSavedTrips() {
        const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];
        const savedTripList = document.getElementById('saved-trip-list');
        savedTripList.innerHTML = '';
    
        if (savedTrips.length === 0) {
            savedTripList.innerHTML = '<ons-list-item>No saved trips.</ons-list-item>';
            return;
        }
    
        savedTrips.forEach(trip => {
            let listItem = document.createElement('ons-list-item');
            listItem.innerHTML = `
              <div class="trip-item">
                <div class="trip-info">
                  <div class="trip-destination">${trip.destination}</div>
                  <div class="trip-notes">${trip.notes}</div>
                  <div class="trip-date">${trip.date} ${trip.time}</div>
                </div>
              </div>
            `;
            savedTripList.appendChild(listItem);
          });
    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            ons.notification.alert("Geolocation is not supported by this browser.");
        }
    }
    
    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const locationInfo = `Lat: ${latitude}, Lon: ${longitude}`;
        document.getElementById('destination').value = locationInfo;
    }
    
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                ons.notification.alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                ons.notification.alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                ons.notification.alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                ons.notification.alert("An unknown error occurred.");
                break;
        }
    }
    
