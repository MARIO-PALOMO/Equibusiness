import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';
declare var google: any;

@Pipe({
  name: 'mapa'
})
export class MapaPipe implements PipeTransform {

  public currentId = 0;

  transform(value: any, args?: any): any {
    return null;
  }

  public mostarAlerta(titulo, texto, tipo) {
    Swal.fire({
      title: titulo,
      html: texto,
      type: tipo
    });
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

  public gestionMapa(map: any, lstDirecciones: any, marcadores: any, estadoProvincia: any, lstProvinciasCiuidades) {
    var geocoder = new google.maps.Geocoder;

    return map.addListener('click', (e) => {

      if (lstDirecciones.length < 5) {
        this.uniqueId(lstDirecciones);


        var latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        geocoder.geocode({ 'location': latlng }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              var emision = this.obtenerLocalizacionEmision(results[0].address_components, lstProvinciasCiuidades);
              if (emision == undefined) {
                this.mostarAlerta("", "Se debe ingresar un punto más exacto a la dirección seleccionada.", "info");
              } else {
                this.agregarMarcador(e.latLng, this.currentId, map, marcadores, lstDirecciones);
                lstDirecciones.push({ id: this.currentId, latitud: e.latLng.lat(), longitud: e.latLng.lng(), nombre: results[0].formatted_address, provincia: (estadoProvincia == 1 ? this.obtenerProvincia(results[0].address_components) : "Global"), codigoPais: emision.CodigoPais, codigoDepartameto: emision.CodigoDepartamento, codigoMunicipio: emision.CodigoMunicipio });
              }
            } else {
              var alerta = 'Las coordenadas del lugar seleccionado no puedieron ser procesadas, intente la selección nuevamente.';
              this.mostarAlerta("", alerta, "info");
            }
          } else {
            this.mostarAlerta("", "Error con el formato de la geoposición, intente nuevamente.", "info");
            console.log('Error con el formato de la geoposición: ' + status);
          }
        });
      } else {
        this.mostarAlerta("", "No se permite seleccionar más de 5 direcciones.", "info");
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

  public obtenerCiudadProvincia(lstDirecciones) {
    var ciudad = "";
    var provincia = this.obtenerProvincia(lstDirecciones);

    for (var direccion of lstDirecciones) {
      for (var tipos of direccion.types) {
        if (tipos == "locality") {
          var str = direccion.long_name;
          ciudad = str;
        }
      }
    }

    if (ciudad == "") {
      for (var direccion_ of lstDirecciones) {
        for (var tipos_ of direccion_.types) {
          if (tipos_ == "administrative_area_level_2") {
            var str_ = direccion_.long_name;
            ciudad = str_;
          }
        }
      }
    }
    return { ciudad: ciudad, provincia: provincia };
  }

  public obtenerLocalizacionEmision(direcciones, datos) {
    var geoposicion = this.obtenerCiudadProvincia(direcciones);
    var parametros: any;
    for (let codigos of datos) {
      if (codigos.TextoDepartamento.toLowerCase() == geoposicion.provincia.toLowerCase()
        && codigos.TextoMunicipio.toLowerCase() == geoposicion.ciudad.toLowerCase()) {
        parametros = codigos;
      }
    }
    return parametros;
  }

  public buscarDireccion(buscador: any, map: any, marcadores: any, lstDirecciones: any, estadoProvincia: any, lstProvinciasCiuidades) {

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

    var obtenerCiudadProvincia = function (lstDirecciones) {
      var ciudad = "";
      var provincia = obtenerProvincia(lstDirecciones);

      for (var direccion of lstDirecciones) {
        for (var tipos of direccion.types) {
          if (tipos == "locality") {
            var str = direccion.long_name;
            ciudad = str;
          }
        }
      }

      if (ciudad == "") {
        for (var direccion_ of lstDirecciones) {
          for (var tipos_ of direccion_.types) {
            if (tipos_ == "administrative_area_level_2") {
              var str_ = direccion_.long_name;
              ciudad = str_;
            }
          }
        }
      }
      return { ciudad: ciudad, provincia: provincia };
    }

    var obtenerLocalizacionEmision = function (direcciones, datos) {
      var geoposicion = obtenerCiudadProvincia(direcciones);
      var parametros: any;
      for (let codigos of datos) {
        if (codigos.TextoDepartamento.toLowerCase() == geoposicion.provincia.toLowerCase() && codigos.TextoMunicipio.toLowerCase() == geoposicion.ciudad.toLowerCase()) {
          parametros = codigos;
        }
      }
      return parametros;
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

    var mostarAlerta = function (titulo, texto, tipo) {
      Swal.fire({
        title: titulo,
        html: texto,
        type: tipo
      });
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
                var emision = obtenerLocalizacionEmision(results[0].address_components, lstProvinciasCiuidades);
                console.log(emision);
                if (emision == undefined) {
                  mostarAlerta("", "Se debe ingresar un punto más exacto a la dirección seleccionada.", "info");
                  alert()
                } else {
                  lstDirecciones.push({ id: currentId, latitud: coordenadas.lat(), longitud: coordenadas.lng(), nombre: results[0].formatted_address, provincia: (estadoProvincia == 1 ? obtenerProvincia(results[0].address_components) : "Global"), codigoPais: emision.CodigoPais, codigoDepartameto: emision.CodigoDepartamento, codigoMunicipio: emision.CodigoMunicipio });
                }

              } else {
                var alerta = 'Las coordenadas del lugar seleccionado no puedieron ser procesadas, intente la selección nuevamente.';
                mostarAlerta("", alerta, "info");
              }
            } else {
              mostarAlerta("", "Error con el formato de la geoposición, intente nuevamente.", "info");
              console.log('Error con el formato de la geoposición: ' + status);
            }
          });
        } else {
          mostarAlerta("", "No se permite seleccionar más de 5 direcciones.", "info");
        }

      });

      map.fitBounds(bounds);
    });

  }

  public buscadorSinMapa(buscador: any, lstDirecciones: any, estadoProvincia: any, lstProvinciasCiuidades) {
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

    var obtenerCiudad = function (lstDirecciones) {
      var ciudad = "";
      for (var direccion of lstDirecciones) {
        for (var tipos of direccion.types) {
          if (tipos == "locality") {
            var str = direccion.long_name;
            ciudad = str;
          }
        }
      }

      if (ciudad == "") {
        for (var direccion of lstDirecciones) {
          for (var tipos of direccion.types) {
            if (tipos == "administrative_area_level_2") {
              var str = direccion.long_name;
              ciudad = str;
            }
          }
        }
      }
      return ciudad;
    }

    var obtenerLocalizacionEmision = function (direccion, datos) {
      var provincia = obtenerProvincia(direccion);
      var ciudad = obtenerCiudad(direccion);
      var parametros: any;
      for (let codigos of datos) {
        if (codigos.TextoDepartamento == provincia && codigos.TextoMunicipio == ciudad) {
          parametros = codigos;
        }
      }
      return parametros;
    }

    var mostarAlerta = function (titulo, texto, tipo) {
      Swal.fire({
        title: titulo,
        html: texto,
        type: tipo
      });
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
                var emision = obtenerLocalizacionEmision(results[0].address_components, lstProvinciasCiuidades);
                lstDirecciones.push({ id: currentId, latitud: coordenadas.lat(), longitud: coordenadas.lng(), nombre: results[0].formatted_address, provincia: (estadoProvincia == 1 ? obtenerProvincia(results[0].address_components) : "Global"), codigoPais: emision.CodigoPais, codigoDepartameto: emision.CodigoDepartamento, codigoMunicipio: emision.CodigoMunicipio });
              } else {
                var alerta = 'Las coordenadas del lugar seleccionada no puedieron ser procesadas intente la selección nuevamente.';
                mostarAlerta("", alerta, "info");
              }
            } else {
              mostarAlerta("", "Error con el formato de la geoposición, intente nuevamente.", "info");
              console.log('Error con el formato de la geoposición: ' + status);
            }
          });
        } else {
          mostarAlerta("", "No se permite seleccionar más de 5 direcciones.", "info");
        }
      });
    });

  }

}
