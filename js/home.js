


var myModal = document.getElementById("myModal");

var btn = document.getElementById("addEventBtn");

var closeBtn = document.getElementById("close");

btn.onclick = function() {
  myModal.style.display = "block";
  document.getElementById("addButton").innerHTML = "Add";
  initEventForm()
}

closeBtn.onclick = function() {
  myModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
}


function displayOnMaps() {
  
}

function getEvents(email_address){
  var apigClient = apigClientFactory.newClient();
  
  var params = {};
  var body = {}
  
  var additionalParams = {
    queryParams: {
      email:'jaeyoon.lee@mths.ca'
    }
  };
  
  

  
  apigClient.eventManagerGet(params, body, additionalParams)
      .then(function(result){
        console.log("success");
        console.log(result)
        // return result
      }).catch( function(result){
        console.log("fail");
        console.log(result)
      });
  
  // genInfoWindow(, map);
}


function genInfoWindow(info, map) {
  const contentString =
    '<div style="padding: 5%;">' +
      '<div style="display: flex; justify-content: space-between;">' +
        '<h2 id="title" style="margin: 0 0 12px; text-align: left;">' + info.eventName + '</h2>' +
        '<button class="mdl-button mdl-js-button mdl-button--primary" onclick="editEvent()">Edit</button>' +
      "</div>" +
      "<div>" +
        '<p style="margin-bottom: 0;">' + info.date + '</p>' +
        '<p style="margin-bottom: 0;">' + info.time + '</p>' +
        '<p style="margin-top: 16px;">' + info.note + '</p>' +
      "</div>" +
    "</div>";
    
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  
  const custonMarker = new google.maps.Marker({
    position: info.eventLoc,
    map,
    // title: "Your event",
  });

  custonMarker.addListener("click", () => {
    infowindow.open({
      anchor: custonMarker,
      map,
      shouldFocus: false,
    });
  });
}


function initAutocomplete() {
  getEvents("")
  // var data = {
  //   UserPoolId : _config.cognito.userPoolId,
  //   ClientId : _config.cognito.clientId
  // };
  // var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
  // var cognitoUser = userPool.getCurrentUser();

  // // var eventInfo = [];
  
  // if (cognitoUser != null) {
  //   cognitoUser.getSession(function(err, session) {
  //     if (err) {
  //       alert(err);
  //       return;
  //     }
  //     //console.log('session validity: ' + session.isValid());

  //     cognitoUser.getUserAttributes(function(err, result) {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       }
  //       // user email address
  //       // console.log(result);
  //       getEvents(result[3].getValue())
  //     });

  //   });
  // } else {
  //   console.log("Already signed-out")
  // }
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 45.397545, lng: -75.689046},
    zoom: 12,
    mapId: '8b356f861117194c',
    disableDefaultUI: true,
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
  
  // const eventInfo = [{
  //   eventLoc: { lat: 45.28503536817652, lng: -75.73935745395954},
  //   eventName: "TITLE",
  //   date: "Oct 4, 2021",
  //   time: "12:34 PM",
  //   note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae lacus ac augue auctor hendrerit. Ut imperdiet mattis scelerisque. Curabitur vitae."
  // }];
  // genInfoWindow(eventInfo[0], map);
  
  // const addBtnDiv = document.createElement("div");
  const addEventBtn = document.getElementById("addEventBtn");
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(addEventBtn);
  
  // addBtnDiv.appendChild(addEventBtn);
  
  
}

