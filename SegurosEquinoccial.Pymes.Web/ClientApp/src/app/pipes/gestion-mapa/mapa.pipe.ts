import { Pipe, PipeTransform } from '@angular/core';
declare var google: any;

@Pipe({
  name: 'mapa'
})
export class MapaPipe implements PipeTransform {

  public currentId = 0;

  transform(value: any, args?: any): any {
    return null;
  }

  public inicializarMapa(mapa: any, coordenadasInicio: Object) {
    return new google.maps.Map(mapa, {
      zoom: 12,
      center: coordenadasInicio
    });
  }

  public uniqueId(lstDirecciones) {

    var numero = 0;
    if (parseInt(lstDirecciones.length) == 0) {
      numero = 0;
    } else {
      numero = lstDirecciones[lstDirecciones.length - 1].id;
    }

    if (numero == 0) {
      return ++this.currentId;
    } else {
      this.currentId = numero;
      return ++this.currentId;
    }

  }

  public gestionMapa(map: any, lstDirecciones: any, marcadores: any, estadoProvincia: any) {
    var geocoder = new google.maps.Geocoder;

    return map.addListener('click', (e) => {

      if (lstDirecciones.length < 5) {
        this.uniqueId(lstDirecciones);

        this.agregarMarcador(e.latLng, this.currentId, map, marcadores, lstDirecciones);
        var latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        geocoder.geocode({ 'location': latlng }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              lstDirecciones.push({ id: this.currentId, latitud: e.latLng.lat(), longitud: e.latLng.lng(), nombre: results[0].formatted_address, provincia: (estadoProvincia == 1 ? this.obtenerProvincia(results[0].address_components) : "Global") });
            } else {
              var nombre_ = 'Coordenadas Agregadas Exitosamente, exceptuando el nombre de la dirección';
              lstDirecciones.push({ id: this.currentId, latitud: e.latLng.lat(), longitud: e.latLng.lng(), nombre: nombre_, provincia: (estadoProvincia == 1 ? this.obtenerProvincia(results[0].address_components) : "Global") });
            }
          } else {
            console.log('Error con el formato de la geoposición: ' + status);
          }
        });
      } else {
        alert('No se permite seleccionar más de 5 direcciones');
      }
    });

  }

  public agregarMarcador(position, markerId, map: any, marcadores: any, lstDirecciones: any) {
    var temp_marker = new google.maps.Marker({
      position: position,
      icon: '../../../assets/images/mapa/pin.png'
    });
    temp_marker.setMap(map);
    temp_marker.metadata = { id: markerId };
    marcadores[markerId] = temp_marker;

    google.maps.event.addListener(temp_marker, "rightclick", (e) => {
      this.eliminarMarcadorVector(markerId, lstDirecciones);
      this.eliminarMarcador(markerId, marcadores);
    });
  }

  public eliminarMarcador(markerId, marcadores: any) {
    if (marcadores[markerId]) {
      marcadores[markerId].setMap(null);
      delete marcadores[markerId];
    }
  }

  public eliminarMarcadorVector(id, lstDirecciones: any) {
    var items = [];
    lstDirecciones.map((e) => { items.push(e.id); });
    var posicion = items.indexOf(id);

    if (posicion > -1) {
      lstDirecciones.splice(posicion, 1);
    }
  }

  public eliminarMarcadorTabla(markerId, marcadores: any, lstDirecciones: any) {
    this.eliminarMarcadorVector(markerId, lstDirecciones);
    this.eliminarMarcador(markerId, marcadores);
  }

  public obtenerProvincia(lstDirecciones) {
    var provincia = "";
    for (var direccion of lstDirecciones) {
      for (var tipos of direccion.types) {
        if (tipos == "administrative_area_level_1") {
          var str = direccion.long_name;
          var res = str.match(/Provincia de /g);
          if (res != null) {
            var dos = str.replace("Provincia de ", "");
            provincia = dos;
          } else {
            provincia = str;
          }
        }
      }
    }
    return provincia;
  }

  public buscarDireccion(buscador: any, map: any, marcadores: any, lstDirecciones: any, estadoProvincia: any) {

    var searchBox = new google.maps.places.SearchBox(buscador);
    var geocoder = new google.maps.Geocoder;
    var coordenadas: any;
    var currentId = this.currentId;

    var uniqueId = function (lstDirecciones) {

      var numero = 0;
      if (parseInt(lstDirecciones.length) == 0) {
        numero = 0;
      } else {
        numero = lstDirecciones[lstDirecciones.length - 1].id;
      }

      if (numero == 0) {
        return ++currentId;
      } else {
        currentId = numero;
        return ++currentId;
      }

    }

    var obtenerProvincia = function (lstDirecciones) {
      var provincia = "";
      for (var direccion of lstDirecciones) {
        for (var tipos of direccion.types) {
          if (tipos == "administrative_area_level_1") {
            var str = direccion.long_name;
            var res = str.match(/Provincia de /g);
            if (res != null) {
              var dos = str.replace("Provincia de ", "");
              provincia = dos;
            } else {
              provincia = str;
            }
          }
        }
      }
      return provincia;
    }

    var eliminarMarcadorVector = function (lstDirecciones) {
      var items = [];
      lstDirecciones.map((e) => { items.push(e.id); });
      var posicion = items.indexOf(currentId);

      if (posicion > -1) {
        lstDirecciones.splice(posicion, 1);
      }
    }

    var eliminarMarcador = function (marcadores) {
      if (marcadores[currentId]) {
        marcadores[currentId].setMap(null);
        delete marcadores[currentId];
      }
    }
    return searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          alert("Returned place contains no geometry");
          return;
        }
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        coordenadas = place.geometry.location;
        uniqueId(lstDirecciones);
        if (lstDirecciones.length < 5) {
          //AGREGAR MARCADOR
          var temp_marker = new google.maps.Marker({
            position: coordenadas,
            icon: '../../../assets/images/mapa/pin.png'
          });
          temp_marker.setMap(map);
          temp_marker.metadata = { id: currentId };
          marcadores[currentId] = temp_marker;

          google.maps.event.addListener(temp_marker, "rightclick", (e) => {
            eliminarMarcadorVector(lstDirecciones);
            eliminarMarcador(marcadores);
          });

          //OBTENER PROVINCIA COORDENADAS
          geocoder.geocode({ 'location': coordenadas }, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                lstDirecciones.push({ id: currentId, latitud: coordenadas.lat(), longitud: coordenadas.lng(), nombre: results[0].formatted_address, provincia: (estadoProvincia == 1 ? obtenerProvincia(results[0].address_components) : "Global") });
              } else {
                var nombre_ = 'Coordenadas Agregadas Exitosamente, exceptuando el nombre de la dirección';
                lstDirecciones.push({ id: currentId, latitud: coordenadas.lat(), longitud: coordenadas.lng(), nombre: nombre_, provincia: (estadoProvincia == 1 ? obtenerProvincia(results[0].address_components) : "Global") });
              }
            } else {
              console.log('Error con el formato de la geoposición: ' + status);
            }
          });
        } else {
          alert('No se permite seleccionar más de 5 direcciones');
        }

      });

      map.fitBounds(bounds);
    });

  }

  public buscadorSinMapa(buscador: any, lstDirecciones: any, estadoProvincia: any) {
    var searchBox = new google.maps.places.SearchBox(buscador);
    var geocoder = new google.maps.Geocoder;
    var coordenadas: any;
    var currentId = this.currentId;
    var uniqueId = function (lstDirecciones) {

      var numero = 0;
      if (parseInt(lstDirecciones.length) == 0) {
        numero = 0;
      } else {
        numero = lstDirecciones[lstDirecciones.length - 1].id;
      }

      if (numero == 0) {
        return ++currentId;
      } else {
        currentId = numero;
        return ++currentId;
      }

    }

    var obtenerProvincia = function (lstDirecciones) {
      var provincia = "";
      for (var direccion of lstDirecciones) {
        for (var tipos of direccion.types) {
          if (tipos == "administrative_area_level_1") {
            var str = direccion.long_name;
            var res = str.match(/Provincia de /g);
            if (res != null) {
              var dos = str.replace("Provincia de ", "");
              provincia = dos;
            } else {
              provincia = str;
            }
          }
        }
      }
      return provincia;
    }

    searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      var bounds = new google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        coordenadas = place.geometry.location;
        uniqueId(lstDirecciones);
        if (lstDirecciones.length < 5) {
          geocoder.geocode({ 'location': coordenadas }, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                lstDirecciones.push({ id: currentId, latitud: coordenadas.lat(), longitud: coordenadas.lng(), nombre: results[0].formatted_address, provincia: (estadoProvincia == 1 ? obtenerProvincia(results[0].address_components) : "Global") });
              } else {
                var nombre_ = 'Coordenadas Agregadas Exitosamente, exceptuando el nombre de la dirección';
                lstDirecciones.push({ id: currentId, latitud: coordenadas.lat(), longitud: coordenadas.lng(), nombre: nombre_, provincia: (estadoProvincia == 1 ? obtenerProvincia(results[0].address_components) : "Global") });
              }
            } else {
              console.log('Error con el formato de la geoposición: ' + status);
            }
          });
        } else {
          alert('No se permite seleccionar más de 5 direcciones');
        }
      });
    });

  }

}
