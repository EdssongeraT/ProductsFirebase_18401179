import { Component } from '@angular/core';
import { Producto } from '../model/producto';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
import { Carrito } from '../model/carrito';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public products : Producto[]
  public carrito : Carrito[]
  public product:Producto;


  constructor(
    private productService:ProductoService,
    private router:Router,
    private carritoService:CarritoService
    ) {
      this.productService.getProducts().subscribe(resp=>{
        this.products = resp
      });
    }

    public getProductById(id:string):void{
      this.router.navigate(['/producto'],{
        queryParams:{id:id}
      });
    }
 
    
  public addCarrito(prod:Producto){
    this.product={
      name:prod.name,
      photo:prod.photo,
      price:prod.price
    }
    this.carritoService.addCarrito(this.product);
  }

}
