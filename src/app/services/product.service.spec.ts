import { TestBed, tick } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResponseProduct } from '../interfaces/product.interface';
import { retryWhen } from 'rxjs';
import { FormsModule } from '@angular/forms';

const mockResponse: ResponseProduct ={
  data:[{
    id:'1',
    name:'Credito',
    logo:'',
    description:'Credito de consumo',
    date_release: new Date('2024-09-10'),
    date_revision:new Date('2025-09-10')
  }]
}
describe('ProductService', () => {
  let service:ProductService;
  let httpTestingController:HttpTestingController;
  const URL_BASE ='http://localhost:3001/bp/'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ ProductService ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService)
  });

  afterEach(() =>{
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(ProductService).toBeTruthy();
  }); 

  it('should call the correct URL and send the right headers', () =>{
 
    const req = httpTestingController.expectOne(URL_BASE + 'pruducts')
    req.flush(mockResponse)
   

    expect(req.request.method).toEqual('GET')
    expect(req.request.headers.has('authorId')).toBe(true)
    expect(req.request.headers.get('authorId')).toBe('50');

    
    
  })
  
});
