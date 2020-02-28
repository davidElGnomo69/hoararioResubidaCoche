import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosServicesService } from '../service/datos-services.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  private horario;
  dias: number[] = [0, 1, 2, 3, 4];

  constructor(public router: Router, public datosServices: DatosServicesService, public toastController: ToastController) {
    this.horario = this.router.getCurrentNavigation().extras.state.horario;
  }

  ngOnInit() {
  }

  getDescripcion(item) {
    this.datosServices.getDescription(item).then((data: any) => {
      let mensaje: string[] = [];
      for (var i = 0; i < data.length; i++) {
        mensaje.push(data[i]);
      }
      this.presentToast(mensaje);
    }).catch(() => {
      return null;
    });
  }

  private async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000
    });
    toast.present();
  }
}

