import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../model/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  public products: Producto[];
  public product : Producto;
  public photo:string;
  public name:string;
  public price:number;
  public prods:Producto[];

  constructor(private productService:ProductoService,
    private router:Router) {
   }

  ngOnInit() {
  }

  public addProduct(){
    this.product={
      photo:this.photo,
      name:this.name,
      price:this.price
    }
    this.productService.addProduct(this.product);
    this.router.navigateByUrl('/home',{replaceUrl:true});
  }

}
