import { Component, inject, OnInit } from '@angular/core';
import { Product, ResponseProduct } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})


export class ProductListComponent implements OnInit{
 constructor(private productService:ProductService){}

  dataProducts:Product[]=[];
  loading:boolean=true

  ngOnInit(): void {
    this.getDataProducts()
  }
 

  getDataProducts(){
    this.productService.getAllProducts().subscribe((response:ResponseProduct) =>{
      this.dataProducts = response.data
      this.loading=false;
    })
  }

}
