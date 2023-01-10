import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Coordenada } from '../model/coordenada';

@Injectable({
  providedIn: 'root'
})
export class CoordenadasService {
  private lastDoc : QueryDocumentSnapshot<any>;
  private dbPath: string = 'coodernadas';
  private dbRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.dbRef = this.db.collection(this.dbPath);
  }

  public async addCoordenada(coordenada: Coordenada): Promise<Coordenada> {
    const { id, ...c } = coordenada;
    let newCoordenada = await this.dbRef.add(c);
    coordenada.id = newCoordenada.id;
    return coordenada;
  }

  public async getCoordenadas(refreshing?:boolean):Promise<Coordenada[]> {
    let coordenadas:Coordenada[] = []
    let r;
    if(refreshing || this.lastDoc == null){
      this.lastDoc = null;
      r = await this.dbRef.ref.orderBy('fecha','desc')
              .limit(10).get();
    }else{
      r = await this.dbRef.ref.orderBy('fecha','desc')
              .startAfter(this.lastDoc)
              .limit(10).get();
    }
    r.docs.forEach(d=>{
      this.lastDoc = d;
      coordenadas.push({id:d.id,...d.data()});
    })
    return coordenadas;
  }

  public removeCoordenada(id): Promise<void> {
    return this.dbRef.doc(id).delete();
  }
}
