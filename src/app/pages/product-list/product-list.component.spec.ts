import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { TableComponent } from '../../components/table/table.component';
import { FormsModule } from '@angular/forms';
import { ResponseProduct } from '../../interfaces/product.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeaderComponent } from '../../components/header/header.component';


const mockResponse:ResponseProduct = { data:[{
  id: "1",
  name: "Cobro de Cheque",
  description: "Es una transacción  realizada en ventanilla",
  logo: "https://tse4.mm.bing.net/th/id/OIP.JQF5ttuSCKCxXp7iHME9TgAAAA?w=442&h=332&rs=1&pid=ImgDetMain",
  date_release: new Date("2024-02-01"),
  date_revision: new Date ("2024-02-04"),
  }]
};

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let httpTestingController:HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent, HeaderComponent, TableComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers:[ProductService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    
  });

  afterEach(() =>{
     httpTestingController.verify()
   })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getAllProducts and return a list of products", fakeAsync(() => {  
    fixture.detectChanges();
    
    const req = httpTestingController.expectOne("http://localhost:3001/bp/products")
    req.flush(mockResponse);
    tick();
    
    expect(component.dataProducts).toEqual(mockResponse.data);
    expect(component.loading).toBe(false)
  }));
});
