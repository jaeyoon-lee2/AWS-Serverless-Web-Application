function switchAllDay() {
  var checkBox = document.getElementById("switch");
  var eventTime = document.getElementById("event-time");
  
  if (checkBox.checked == true) {
    eventTime.type = "date";
  } else {
    eventTime.type = "datetime-local";
  }
}


function applyEvent() {
  var params = {};

  var body = {
    "email": "jaeyoon.lee@mths.ca",
    "event_key": numberOfMarkers + 1,
    "date": document.getElementById("event-time").value,
    "location": {
      "lat": 45.2786222,
      "lng": -75.7390968
    },
    "title": document.getElementById("title").value,
    "note": document.getElementById("note").value
  }
  
  var apigClient = apigClientFactory.newClient({
    apiKey: 'tXyMNOlHXw3Ojdlzli9uw9FvlGhbwY21bD0f6vdh'
  });

  
  apigClient.eventManagerPost(params, body)
      .then(function(result){
        console.log("success");
        console.log(result)
      }).catch( function(result){
        console.log("fail");
        console.log(result)
      });
}

function editEvent() {
  // alert("EDIT WINDOW");
  myModal.style.display = "block";
  document.getElementById("addButton").innerHTML = "Edit";
  initEventForm()
}

function initEventForm(eventInformation = {
    eventLoc: {},
    eventName: "",
    date: "",
    time: "",
    note: ""
  
  }) {
  const map = new google.maps.Map(document.getElementById("formMap"), {
    center: {lat: 45.397545, lng: -75.689046},
    zoom: 12,
    mapId: '8b356f861117194c',
    disableDefaultUI: true,
  });
  // Create the search box and link it to the UI element.
  const inputLoction = document.getElementById("location_input");
  const searchBox = new google.maps.places.SearchBox(inputLoction);
  const button = document.getElementById("addButton");

  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      
      // console.log(place.geometry.location);

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      console.log(bounds);
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    console.log(bounds);
  });
}
