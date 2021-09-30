
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
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
        
        console.log(pos);
      },
    );
  } else {
    // Browser doesn't support Geolocation
    alert("Location information is unavailable.")
  }
  
  const appointmentLoc = { lat: 45.28503536817652, lng: -75.73935745395954};
  const date = "Oct 4, 2021";
  const eventName = "IELTS";
  
  
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading"> ' + eventName + '</h1>' +
    '<div id="bodyContent">' +
    '<p>' + date + '</p>'
    // "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    // "sandstone rock formation in the southern part of the " +
    // "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    // "south west of the nearest large town, Alice Springs; 450&#160;km " +
    // "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    // "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    // "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    // "Aboriginal people of the area. It has many springs, waterholes, " +
    // "rock caves and ancient paintings. Uluru is listed as a World " +
    // "Heritage Site.</p>" +
    // '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    // "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    // "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";
    
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    
    const custonMarker = new google.maps.Marker({
      position: appointmentLoc,
      map,
      title: "Your appointment",
    });
  
    custonMarker.addListener("click", () => {
      infowindow.open({
        anchor: custonMarker,
        map,
        shouldFocus: false,
      });
    });
  
  // const features = [
  //   {
  //     position: new google.maps.LatLng(45.397545, -75.689046),
  //     size: new google.maps.Size(34,34)},
  //     type: "info",
  //   },
  // ];
  
  // Create markers.
  // for (let i = 0; i < features.length; i++) {
  //   const marker = new google.maps.Marker({
  //     position: features[i].position,
  //     icon: icons[features[i].type].icon,
  //     map: map,
  //   });
  // }
}
