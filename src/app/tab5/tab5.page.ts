import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Coordenada } from '../model/coordenada';
import { MapPage } from '../pages/map/map.page';
import { CoordenadasService } from '../services/coordenadas.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  @ViewChild('infinitescroll') infinitescroll : ElementRef;
  public coordenadas:Coordenada[]=[];

  constructor(private coordenadaS:CoordenadasService, 
     private uiS:UiService,
     private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.coordenadas=await this.coordenadaS.getCoordenadas(true);
  }

  public async loadCoordenadas(event){
    this.coordenadas = await this.coordenadaS.getCoordenadas(true);
    event.target.complete();
   // (this.infinitescroll.nativeElement as IonInfiniteScroll).disabled=false;
  }

  public async loadMoreCoordenadas(event){
    let newCoordenadas:Coordenada[] = await this.coordenadaS.getCoordenadas();
    this.coordenadas=this.coordenadas.concat(newCoordenadas);
    (event as InfiniteScrollCustomEvent).target.complete();
    //if(newNotes.length<10) (event.target as IonInfiniteScroll).disabled = true;
  }

  public async showMap(coordenada:Coordenada){
    
    const modal = await this.modalCtrl.create({
      component: MapPage,
      componentProps:{data:coordenada}
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    
  }

  public deleteCoordenada(coordenada){
    coordenada.hided = true;
    
    const timeout = setTimeout(()=>{
      this.coordenadaS.removeCoordenada(coordenada.id);
      this.coordenadas = this.coordenadas.filter(n=> n.id!=coordenada.id);
    },3000);
    
    this.uiS.showToastOptions("Deshacer borrado",()=>{
      clearTimeout(timeout); //cancelada la cuenta atrás para el borrado en ddbb
      coordenada.hided=undefined;
    });
  }

}
