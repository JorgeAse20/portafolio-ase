import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  
  constructor( private http: HttpClient) {

    this.cargarProductos();
   }

   private cargarProductos() {

    return new Promise((resolve,reject) => {

      this.http.get('https://angular-htmal-ase.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[]) =>{
     // console.log(resp);
     this.productos = resp;
      setTimeout(() => {
      this.cargando = false;
      resolve();
      }, 500);

    });

    });

    

   }

   getProducto( id: string) {

    return this.http.get(`https://angular-htmal-ase.firebaseio.com/productos/${ id }.json`)

   }

   buscarProducto( termino:string) {

    if (this.productos.length === 0) {
      // cargar productos

      this.cargarProductos().then(()=> {

        this.filtarProductos( termino );

      });
    } else {
      // aplcar filtro
      this.filtarProductos( termino );
      
    }

   }

   private filtarProductos( termino: string) {
     
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino) >= 0) {
        this.productosFiltrado.push( prod );
      }

    });


   }


}
