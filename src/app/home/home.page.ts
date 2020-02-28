import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatosServicesService } from '../service/datos-services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  avalaible = false;
  private _estudios: string[] = [];

  constructor(public router: Router, public datosServices: DatosServicesService) {}

 

  paraGrupos(group: string) {

    this.datosServices.getGrupos(group).then((data) => {
      let navigationExtras: NavigationExtras = {
        state: {
          grupo: data
        }
      };
      this.router.navigate(['/grupos'], navigationExtras);
    }).catch(() => {
      return null;}
    );
  }

  getGrupos(nombre:string){
    return this.datosServices.getGrupos(nombre);
  }

  muestraLista() {
    this.avalaible = true;
    this.solicitarUsuario();
  }

  solicitarUsuario() {
    this.datosServices.getEstudios().then((estudios) => {
      this._estudios = estudios;
    }).catch(() => {
      return null;
    });
  }

}
