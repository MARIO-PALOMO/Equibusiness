import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SesionService } from '../../../servicios/sesion/sesion.service';
@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {


  @Input() private pagina: number;

  @Input() private paginasTotales: number;

  @Input() public cotizacionesExistentes: number;

  @Output() paginaEmitter: EventEmitter<number> = new EventEmitter();

  public usuario: any;

  constructor(private sesion: SesionService) { }

  ngOnInit() {
    this.usuario = this.sesion.obtenerDatos();
  }

  siguiente() {

    this.pagina++;

    this.pasarPagina();

  }

  anterior() {

    this.pagina--;

    this.pasarPagina();

  }

  pasarPagina() {

    this.paginaEmitter.emit(this.pagina);

  }

}
