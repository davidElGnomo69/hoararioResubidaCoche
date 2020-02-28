import { DatosServicesService } from './../service/datos-services.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Horario } from '../model/horario';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  private grupos;

  constructor(public router: Router, public datosServices: DatosServicesService) {
    this.grupos = this.router.getCurrentNavigation().extras.state.grupo;

  }

  ngOnInit() {
  }
  
  paraHorario(item) {
    var cosa;
    var horario;
    this.datosServices.getHorario(item).then((data) => {
      cosa = data;
      horario = new Horario(item, this.datosServices.convertToHorario(cosa));
      let navigationExtras: NavigationExtras = {
        state: {
          horario: horario
        }
      };
      this.router.navigate(['/horario'], navigationExtras);
    }).catch(() => {
      return null;
    }
    );

  }
}
