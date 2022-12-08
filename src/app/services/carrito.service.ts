import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  constructor(private firestore:AngularFirestore) { 

  }

  public getCarrito():Observable<Producto[]>{
    return this.firestore.collection("carrito").snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return {id,...data}
        });
      }));
  }

  public addCarrito(prodCarrito:Producto){
    this.firestore.collection('carrito').add(prodCarrito)
  }

  public removeProduct(id: string){
    this.firestore.collection('carrito').doc(id).delete();
  }

}
