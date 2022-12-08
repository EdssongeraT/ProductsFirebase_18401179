import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { CarritoService } from '../services/carrito.service';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  private carrito:Producto[]
  public total:number;
  constructor(
    private carritoServ:CarritoService
    ) {
      this.total=0
      this.carritoServ.getCarrito().subscribe(resp=>{
        this.carrito = resp
        if(this.carrito){
          for(let i=0;i<this.carrito.length;i++){
            this.total+=this.carrito[i].price
          }
        }
      });
   }

   public async removeProduct(id: string) {
      this.carritoServ.removeProduct(id);
      this.total=0
  }

  ngOnInit() {
  }

}
