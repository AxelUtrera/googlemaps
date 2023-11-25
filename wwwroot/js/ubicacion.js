let mapa = null;

let latitud = 19.531142;
let longitud = -96.9271873;

let latitudHome;
let longitudHome;

let transportesSelect = document.getElementById("Transporte");

let rutaCheck = document.querySelector("#Ruta");

let directionsRender = new google.maps.DirectionsRenderer();

function dibujarMapa(){
    mapa = $('#mapa').locationpicker({
        location: { latitude:latitud, longitude:longitud},
        radius:300,
        addressFormat: 'point_of_interest',
        inputBinding: { 
            latitudeInput: $('#Latitud'),
            longitudeInput: $('#Longitud'),
            locationNameInput: $('#Localizador')
        },
        enableAutocomplete:true,
        enableReverseGeocode:true,
        onchange:function(currentLocation, radius,isMarkedDropped){
            latitud = currentLocation.latitude;
            longitud = currentLocation.longitude;
            distancia();
        }
    })
}



function miUbicacion() { 
    let mapaContext = mapa.locationpicker('map');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitudHome = position.coords.latitude;
                longitudHome = position.coords.longitude;
                new google.maps.Marker({
                    position:{
                        lat:latitudHome, lng:longitudHome
                    },
                    map:mapaContext.map,
                    title:"Esta es tu ubicacion actual",
                    icon:"imagenes/home.png"
                });
                distancia();
            },
            () => {
                $('#Distancia').val("La localizacion no esta activada");
            } 
        );
    }else{
        $($Distancia).val("El navegador nos oporta la geolocalización");
    }
}


function distancia(){
    let mapContext = mapa.locationpicker('map');

    const service = new google.maps.DistanceMatrixService();
    const selectedMode = document.getElementById("Transporte").value;

    const origen = { lat: latitudHome, lng: longitudHome};
    const destino = {lat: latitud, lng:longitud}
    const request = {
        origins:[origen],
        destinations:[destino],
        travelModel: google.maps.TravelMode[selectedMode],
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways:false,
        avoidTolls:false
    }

    service.getDistanceMatrix(request).then((response) => {
        if(response.rows.length > 0){
            $('#Distancia').val(response.rows[0].elements[0].distance.text);
            $('#Tiempo').val(response.rows[0].elements[0].duration.text);
        }
    });

    if(rutaCheck.checked){
        const directionsService = new google.maps.DirectionsService();
        DirectionsRenderer.setMap(mapContext.map);

        directionsService
            .route({
                origin:origen,
                destination:destino,
                travelMode:google.maps.TravelMode[selectedMode]
            })
            .then((response)=> {
                directionsRender.setDirectinos(response);
            });
    }else{
        DirectionsRenderer.setMap(null);
    }
}