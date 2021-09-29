// JavaScript File
var x = document.getElementById("demo");

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
    // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        const marker = new google.maps.Marker({
          position: pos,
          map: map,
        });
      },
    );
  } else {
    // Browser doesn't support Geolocation
    alert("Location information is unavailable.")
  }
}

