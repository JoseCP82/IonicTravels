import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { Coordenada } from 'src/app/model/coordenada';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;
  @Input('data') data:Coordenada;
  latitud:number;
  longitud:number;
  
  constructor( private modalCTRL:ModalController) { }

  ngOnInit() {
    this.latitud=this.data.latitud;
    this.longitud=this.data.longitud;
  }

  ionViewDidEnter(){
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config:{
        center: {
          lat: this.data.latitud,
          lng: this.data.longitud,
        },
        zoom: 8,
      }  
    });
    this.addMarkers();
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: this.data.latitud,
          lng: this.data.longitud,
        },
        title: 'Estuve aquí!',
        snippet: 'Muy chulo!',
      }
    ];

    await this.map.addMarkers(markers);
  }

  closeMapModal() {
    this.modalCTRL.dismiss({
      'dismissed':true
    });
  }
}
