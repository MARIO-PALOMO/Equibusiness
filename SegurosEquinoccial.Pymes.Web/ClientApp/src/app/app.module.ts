import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { IntlModule } from '@progress/kendo-angular-intl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { NavBarAdministracionComponent } from './administracion/complementos/nav-bar/nav-bar.component';
import { InicioClienteComponent } from './cliente/inicio/inicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { InicioAdministracionComponent } from './administracion/inicio/inicio.component';
import { CotizacionComponent } from './cliente/cotizacion/cotizacion.component';
import { TopBarComponent } from './cliente/complementos/top-bar/top-bar.component';
import { VistaPipe } from './pipes/getion-vista/vista.pipe';
import { MapaPipe } from './pipes/gestion-mapa/mapa.pipe';
import { ApiService } from './servicios/api/api.service';
import { SesionService } from './servicios/sesion/sesion.service';
import { GlobalesPipe } from './metodos/globales/globales.pipe';
import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { SwitchModule } from '@progress/kendo-angular-inputs';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { TooltipModule } from 'ng2-tooltip-directive';
import { VehiculosPipe } from './pipes/gestion-vehiculos/vehiculos.pipe';
import { ValidacionPipe } from './pipes/gestion-validacion/validacion.pipe';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { IncedioComponente } from './cliente/cotizacion-ramos/ramo-incendio/incendio.component';
import { EquipoEleconicoComponente } from './cliente/cotizacion-ramos/ramo-equipo-electronico/equipo-electronico.component';
import { RoturaMaquinariaComponente } from './cliente/cotizacion-ramos/ramo-rotura-maquinaria/rotura-maquinaria.component';
import { LucroRoturaMaqunariaComponente } from './cliente/cotizacion-ramos/ramo-lucro-rotura-maquinaria/lucro-rotura-maquinaria.component';
import { LucroIncedioComponente } from './cliente/cotizacion-ramos/ramo-lucro-incendio/lucro-incendio.component';
import { RoboAsaltoComponente } from './cliente/cotizacion-ramos/ramo-robo-asalto/robo-asalto.component';
import { DineroValoresComponente } from './cliente/cotizacion-ramos/ramo-dinero-valores/dinero-valores.component';
import { EquipoMaquinariaComponente } from './cliente/cotizacion-ramos/ramo-equipo-maquinaria/equipo-maquinaria.component';
import { CoberturasAdicionalesComponente } from './cliente/cotizacion-ramos/ramo-coberturas-adicionales/coberturas-adicionales.component';
import { ResponsabilidadCivilComponente } from './cliente/cotizacion-ramos/ramo-responsabilidad-civil/responsabilidad-civil.component';
import { FidelidadComponente } from './cliente/cotizacion-ramos/ramo-fidelidad/fidelidad.component';
import { AccidentesPersonalesComponente } from './cliente/cotizacion-ramos/ramo-accidentes-personales/accidentes-personales.component';
import { TransportesComponente } from './cliente/cotizacion-ramos/ramo-transportes/transportes.component';
import { VehiculosComponente } from './cliente/cotizacion-ramos/ramo-vehiculos/vehiculos.component';
import { FooterComponent } from './cliente/complementos/footer/footer.component';
import { VerificacionService } from './servicios/cotizacion/verificacion.service';
import { CotizacionInicioComponent } from './cliente/cotizacion-inicio/cotizacion-inicio.component';
import { ValidacionCotizadorPipe } from './pipes/gestion-validacion-cotizador/validacion-cotizador.pipe';
import { CotizacionGirosComponent } from './cliente/cotizacion-giros/cotizacion-giros.component';
import { RamosService } from './servicios/cotizacion/ramos.service';
import { CotizacionGarantiasComponent } from './cliente/cotizacion-garantias/cotizacion-garantias.component';
import { CotizacionCondicionesComponent } from './cliente/cotizacion-condiciones/cotizacion-condiciones.component';
import { CotizacionService } from './servicios/cotizacion/cotizacion.service';
import '@progress/kendo-angular-intl/locales/es/all';
import { FinalizacionService } from './servicios/cotizacion/finalizacion.service';
import { CotizacionReporteComponent } from './cliente/cotizacion-reporte/cotizacion-reporte.component';
import { InicioSupervisionComponent } from './supervisor/inicio/inicio.component';
import { TopBarSupervisionComponent } from './supervisor/complementos/top-bar/top-bar.component';
import { ResumenSupervisionComponent } from './supervisor/resumen/resumen.component';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { InicioGerenciaComponent } from './gerente/inicio/inicio.component';
import { TopBarGerenteComponent } from './gerente/complementos/top-bar/top-bar.component';
import { ResumenGerenteComponent } from './gerente/resumen/resumen.component';
import { PerfilClienteComponent } from './cliente/perfil/perfil.component';
import { TransportesImportacionesComponente } from './cliente/cotizacion-ramos/ramo-transportes-importaciones/transportes-importaciones.component';
import { ZCotizacionReporteEmailClienteComponent } from './cliente/z-cotizacion-reporte-email-cliente/z-cotizacion-reporte-email-cliente.component';
import { ZCotizacionReporteEmailUsuarioComponent } from './cliente/z-cotizacion-reporte-email-usuario/z-cotizacion-reporte-email-usuario.component';
import { CotizacionReporteEmailComponent } from './cliente/cotizacion-reporte-email/cotizacion-reporte-email.component';
import { GeneradorService } from './metodos/generador/generador.service';
import { EmisionService } from './controladores/emision/emision.service';
import { ResumenService } from './controladores/resumen/resumen.service';
import { GenericoService } from './controladores/generico/generico.service';
import { GeneradorVehiculosService } from './metodos/generador-vehiculos/generador-vehiculos.service';
import { PolizaMultiriesgoService } from './controladores/polizas/poliza-multiriesgo.service';
import { CotizacionRamoGeneral } from './cliente/cotizacion-ramos/cotizacion.ramo.general';
import { PagoService } from './controladores/pago/pago.service';
import { GestionService } from './controladores/gestion/gestion.service';
import { UsuarioComponent } from './gerente/usuario/usuario.component';
import { GeneradorCompromisosService } from './metodos/generador-compromiso/generador-compromiso.service';
import { ReporteComponent } from './gerente/reporte/reporte.component';
import { MultiViewCalendarModule } from '@progress/kendo-angular-dateinputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ValidacionComponent } from './gerente/validacion/validacion.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { PaginacionComponent } from './cliente/complementos/paginacion/paginacion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarAdministracionComponent,
    InicioSesionComponent,
    InicioClienteComponent,
    InicioAdministracionComponent,
    CotizacionComponent,
    TopBarComponent,
    VistaPipe,
    MapaPipe,
    GlobalesPipe,
    VehiculosPipe,
    ValidacionPipe,
    IncedioComponente,
    EquipoEleconicoComponente,
    RoturaMaquinariaComponente,
    LucroRoturaMaqunariaComponente,
    LucroIncedioComponente,
    RoboAsaltoComponente,
    DineroValoresComponente,
    EquipoMaquinariaComponente,
    CoberturasAdicionalesComponente,
    ResponsabilidadCivilComponente,
    FidelidadComponente,
    AccidentesPersonalesComponente,
    TransportesComponente,
    TransportesImportacionesComponente,
    VehiculosComponente,
    FooterComponent,
    CotizacionInicioComponent,
    ValidacionCotizadorPipe,
    CotizacionGirosComponent,
    CotizacionGarantiasComponent,
    CotizacionCondicionesComponent,
    CotizacionReporteComponent,
    InicioSupervisionComponent,
    TopBarSupervisionComponent,
    ResumenSupervisionComponent,
    TopBarGerenteComponent,
    InicioGerenciaComponent,
    ResumenGerenteComponent,
    PerfilClienteComponent,
    ZCotizacionReporteEmailClienteComponent,
    ZCotizacionReporteEmailUsuarioComponent,
    CotizacionReporteEmailComponent,
    UsuarioComponent,
    ReporteComponent,
    ValidacionComponent,
    PaginacionComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IntlModule,
    DropDownsModule,
    GridModule,
    ExcelModule,
    PDFModule,
    NumericTextBoxModule,
    DateInputsModule,
    SwitchModule,
    TooltipModule,
    NgxSpinnerModule,
    PDFExportModule,
    UploadModule,
    MultiViewCalendarModule,
    DatePickerModule,
    InputsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: InicioSesionComponent, pathMatch: 'full' },
      { path: 'cliente/inicio', component: InicioClienteComponent },
      { path: 'cliente/cotizacion/inicio', component: CotizacionInicioComponent },
      { path: 'cliente/cotizacion/cotizacion', component: CotizacionComponent },
      { path: 'cliente/cotizacion/giros', component: CotizacionGirosComponent },
      { path: 'cliente/cotizacion/garantias', component: CotizacionGarantiasComponent },
      { path: 'cliente/cotizacion/condiciones', component: CotizacionCondicionesComponent },
      { path: 'cliente/cotizacion/reporte', component: CotizacionReporteComponent },
      { path: 'cliente/perfil', component: PerfilClienteComponent },
      { path: 'cliente/cotizacion/reporte/email/c/:datos', component: ZCotizacionReporteEmailClienteComponent },
      { path: 'cliente/cotizacion/reporte/email/u/:datos', component: ZCotizacionReporteEmailUsuarioComponent },
      { path: 'supervisor/inicio', component: InicioSupervisionComponent },
      { path: 'supervisor/resumen', component: ResumenSupervisionComponent },
      { path: 'gerencia/inicio', component: InicioGerenciaComponent },
      { path: 'gerencia/resumen', component: ResumenGerenteComponent },
      { path: 'gerencia/usuario', component: UsuarioComponent },
      { path: 'gerencia/reporte', component: ReporteComponent},
      { path: 'gerencia/validacion', component: ValidacionComponent},
      { path: 'cotizacion', component: CotizacionReporteEmailComponent }
    ])
  ],
  providers: [CotizacionRamoGeneral, ApiService, SesionService, VerificacionService, RamosService, CotizacionService, FinalizacionService, GeneradorService, EmisionService, ResumenService, GenericoService, GeneradorVehiculosService, PolizaMultiriesgoService, PagoService, GestionService, GeneradorCompromisosService,{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
  entryComponents: [
    IncedioComponente,
    EquipoEleconicoComponente,
    RoturaMaquinariaComponente,
    LucroRoturaMaqunariaComponente,
    LucroIncedioComponente,
    RoboAsaltoComponente,
    DineroValoresComponente,
    EquipoMaquinariaComponente,
    CoberturasAdicionalesComponente,
    ResponsabilidadCivilComponente,
    FidelidadComponente,
    AccidentesPersonalesComponente,
    TransportesComponente,
    TransportesImportacionesComponente,
    VehiculosComponente
  ]
})
export class AppModule { }
