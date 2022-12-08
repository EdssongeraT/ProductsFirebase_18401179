import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private products: Producto[];

  constructor(private firestore:AngularFirestore) { 
    
    /*
    this.products = [
      {
        name: "Jabon",
        price: 20,
        photo:'https://picsum.photos/100/?random=1'
      },
      {
        name: "Cloro",
        price: 18,
        photo:'https://picsum.photos/100/?random=2'
      },
      {
        name: "Fabuloso",
        price: 27,
        photo:'https://picsum.photos/100/?random=3'
      },
      {
        name: "Pinol",
        price: 32,
        photo:'https://picsum.photos/100/?random=4'
      }
    ]*/

  }

  public getProducts(): Observable<Producto[]>{
    return this.firestore.collection('products').snapshotChanges().pipe(
    map(actions =>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;
        return {id,...data}
      });
    }));
  }

  public getProductById(id:string){
    let result = this.firestore.collection('products').doc(id).valueChanges();
    return result;
  }

  public addProduct(product:Producto){
    this.firestore.collection("products").add(product)
  }

}
