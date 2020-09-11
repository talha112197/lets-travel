let platform = new H.service.Platform({
    'apikey': 'qxSe8tkSwiBXogH_rgMAf4U1JjrPaI_QRBDXvHB5cIg',
    'app_id': '5CBRPPyRGCqJOuO9hctB'
});

function landmarkGeocode() {
    let title = document.querySelector('h1').textContent;
    var geocoder = platform.getSearchService(),
        landmarkGeocodingParameters = {
          q: title,
          at: '0,0',
          limit: 1
        };
  
    geocoder.discover(
      landmarkGeocodingParameters,
      showMap,
      (e) => { 
        console.log(e)  
      }
    );
  }

  function showMap(result) {
    var defaultLayers = platform.createDefaultLayers();
    var location = result.items[0].position;
    
    console.log(location);
    

    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map,
        {
          zoom: 15,
          center: { lat: location.lat, lng: location.lng }
        });
        let marker = new H.map.Marker({lat: location.lat, lng: location.lng});
    map.addObject(marker);
        // Create the default UI components
        var ui = H.ui.UI.createDefault(map, defaultLayers);

  }

landmarkGeocode();


  