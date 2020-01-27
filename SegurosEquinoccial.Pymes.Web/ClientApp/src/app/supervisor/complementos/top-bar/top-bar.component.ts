import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../../servicios/sesion/sesion.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-top-bar-supervision',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarSupervisionComponent implements OnInit {

  public usuario: any;
  public panelMenu = {
    menu: true,
    lista: false,
    sidenav: false
  }

  public url = "";
  constructor(private sesion: SesionService, private router : Router) { }

  ngOnInit() {
    this.url = this.router.url;
    this.usuario = this.sesion.obtenerDatos();
    if ($(window).width() < 620) {
      $("#barra").css("background-color", "#EEEEEE");
      $("#apps").css("font-size", "25px");
      $("#apps").css("color", "black");
    } else {
      $("#barra").css("background-color", "rgb(" + this.usuario.broker.Color + ")");
      $("#apps").css("font-size", "25px");
      $("#apps").css("color", "white");
    }
  }

  estilo(event) {
    if (event.target.innerWidth < 620) {
      $("#barra").css("background-color", "#EEEEEE");
      $("#apps").css("font-size", "25px");
      $("#apps").css("color", "black");
    } else {
      $("#barra").css("background-color", "rgb(" + this.usuario.broker.Color + ")");
      $("#apps").css("font-size", "25px");
      $("#apps").css("color", "white");
    }
  }

  cerrarSesion() {
    this.sesion.cerrarSesion();
  }

  public gestionPanelMenu(panel) {
    if (panel == 'menu') {
      setTimeout(() => {
        this.panelMenu.menu = true;
        this.panelMenu.lista = false;
      }, 3000);
    } else if (panel == 'lista') {
      this.panelMenu.menu = false;
      this.panelMenu.lista = true;
    }
  }
  public gestionPanelSideNav() {
    if (this.panelMenu.sidenav == false) {
      this.panelMenu.sidenav = true;
    } else if (this.panelMenu.sidenav == true) {
      this.panelMenu.sidenav = false;
    }
  }

  public cerrarPanelSideNav() {
    this.panelMenu.sidenav = false;
  }

}
