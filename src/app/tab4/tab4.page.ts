import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Coordenada } from '../model/coordenada';
import { CoordenadasService } from '../services/coordenadas.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  latitud:number=0.0;
  longitud:number=0.0;
  fecha:Date = new Date();

  constructor(private coordenadaS: CoordenadasService, private uiS:UiService) { }

  ngOnInit() {
    setInterval(() => {
      this.fecha = new Date();
    },1000);
  }

  public async obtenerCoordenadas(){
    const coordenadas=await Geolocation.getCurrentPosition();
    this.latitud=coordenadas.coords.latitude;
    this.longitud=coordenadas.coords.longitude;
    let coordenada: Coordenada = {
      latitud: this.latitud,
      longitud: this.longitud,
      fecha: this.fecha.toString()
    }
    try {
      await this.coordenadaS.addCoordenada(coordenada);
      this.uiS.showToast("Ubicación almacenada correctamente!");
    }catch(err){
      this.uiS.showToast(" Algo ha ido mal ;( ","danger");
    }
    
  }
}
