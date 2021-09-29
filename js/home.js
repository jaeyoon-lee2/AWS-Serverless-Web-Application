// JavaScript File
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 45.397545, lng: -75.689046},
    zoom: 12,
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
  
  const iconBase =
    "https://..."
    const icons = {
    // parking: {
    //   icon: iconBase + "parking_lot_maps.png",
    // },
    // library: {
    //   icon: iconBase + "library_maps.png",
    // },
    info: {
      icon: iconBase,
    },
  };
  
  const features = [
    {
      position: new google.maps.LatLng(45.397545, -75.689046),
      type: "info",
    },
  ];
  
  // Create markers.
  for (let i = 0; i < features.length; i++) {
    const marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map,
    });
  }
}

