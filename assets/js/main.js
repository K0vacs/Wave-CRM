function loadDoc() {
  
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var prettyData = data.data.business.customers.edges.map(transformData);
      useData(prettyData);
    }
  };
  
  xhttp.open("POST", "https://gql.waveapps.com/graphql/public", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.setRequestHeader('Accept', 'application/json');
  xhttp.setRequestHeader('Authorization', 'Bearer 8NBKTN3t9pfYUS0GsEoNapjY6ooRbi');
  xhttp.send(JSON.stringify({
              query: `{ 
                business(id: "QnVzaW5lc3M6NjNiOTVkZGItNWRkOS00MzI0LWEzNGYtMDkxOTJmNjNjNDc0") { 
                  customers { 
                    edges { 
                      node {
                        id
                        name
                        firstName
                        lastName
                        mobile
                        address {
                          addressLine1
                        }
                      } 
                    } 
                  }
                } 
              }`
            })
          );
}

function transformData(item, index) {
  var customers = {
    id: item.node.id, 
    name: item.node.name, 
    firstName: item.node.firstName,
    lastName: item.node.lastName,
    mobile: item.node.mobile,
    address: item.node.address.addressLine1
  };
 
  return customers;
}

function useData(data) {
  var i;
  for(i = 0; i < data.length; i++) {
    document.getElementById("table-body").innerHTML += `
      <tr id="${data[i].id}">
          <th scope="row">${i + 1}</th>
          <td class="company">${data[i].name}</td>
          <td class="first-name">${data[i].firstName}</td>
          <td class="last-name">${data[i].lastName}</td>
          <td class="mobile">${data[i].mobile}</td>
          <td class="address">${data[i].address}</td>
      </tr>
    `;
  }
}



function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: -28.024, lng: 140.887}
  });

  // Create an array of alphabetical characters used to label the markers.
//  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  var geocoder = new google.maps.Geocoder();
//  var locations = geocodeAddress(geocoder, map);
  var markers = geocodeAddress(geocoder, map);
  // var markers = locations.map(function(location, i) {
  //   return new google.maps.Marker({
  //     position: location,
  //     label: labels[i % labels.length]
  //   });
  // });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      
  
  
  
}

function transformAddress() {
  var locations = [
    {lat: -31.563910, lng: 147.154312},
    {lat: -33.718234, lng: 150.363181},
    {lat: -33.727111, lng: 150.371124},
    {lat: -33.848588, lng: 151.209834},
    {lat: -33.851702, lng: 151.216968},
    {lat: -34.671264, lng: 150.863657},
    {lat: -35.304724, lng: 148.662905},
    {lat: -36.817685, lng: 175.699196},
    {lat: -36.828611, lng: 175.790222},
    {lat: -37.750000, lng: 145.116667},
    {lat: -37.759859, lng: 145.128708},
    {lat: -37.765015, lng: 145.133858},
    {lat: -37.770104, lng: 145.143299},
    {lat: -37.773700, lng: 145.145187},
    {lat: -37.774785, lng: 145.137978},
    {lat: -37.819616, lng: 144.968119},
    {lat: -38.330766, lng: 144.695692},
    {lat: -39.927193, lng: 175.053218},
    {lat: -41.330162, lng: 174.865694},
    {lat: -42.734358, lng: 147.439506},
    {lat: -42.734358, lng: 147.501315},
    {lat: -42.735258, lng: 147.438000},
    {lat: -43.999792, lng: 170.463352}
  ]
  return locations;
}

function geocodeAddress(geocoder, resultsMap) {
  var address = '10 Fir Road, Morningside';
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
//      return [{lat: -31.563910, lng: 147.154312}, {lat: -33.718234, lng: 150.363181}];
      
      // resultsMap.setCenter(results[0].geometry.location);
      // var marker = new google.maps.Marker({
      //   map: resultsMap,
      //   position: results[0].geometry.location
      // });
      
      var latLongs = [{lat: -31.563910, lng: 147.154312}, {lat: -33.718234, lng: 150.363181}]; //results[0].geometry.location;
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
//      resultsMap.setCenter(latLongs);
      var markers = latLongs.map(function(latLong, i) {
        return new google.maps.Marker({
          position: latLong,
          label: labels[i % labels.length]
        });
      });
  
    }
  });
}