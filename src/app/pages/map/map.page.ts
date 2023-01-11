import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Coordenada } from 'src/app/model/coordenada';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @Input('data') data:Coordenada;
  latitud:number;
  longitud:number;
  
  constructor( private modalCTRL:ModalController) { }

  ngOnInit() {
    this.latitud=this.data.latitud;
    this.longitud=this.data.longitud;
  }

  closeMapModal() {
    this.modalCTRL.dismiss({
      'dismissed':true
    });
  }
}
