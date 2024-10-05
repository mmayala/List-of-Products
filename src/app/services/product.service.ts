import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ResponseProduct } from '../interfaces/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviromnents } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL_BASE = enviromnents.URLBASE

  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<ResponseProduct>{
    const headers = new HttpHeaders().set('authorId', '50')
    return this.http.get<ResponseProduct>( this.URL_BASE + 'products', { headers: headers})
  }
}
