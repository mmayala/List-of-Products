import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Product, ResponseProduct} from '../../interfaces/product.interface';
import { HeaderComponent } from '../../components/header/header.component';
import { TableComponent } from '../../components/table/table.component';
import { FormsModule } from '@angular/forms';



describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService:ProductService
  let httpTestingController:HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent, HeaderComponent, TableComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [ProductService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService)
    httpTestingController = TestBed.inject(HttpTestingController)
    fixture.detectChanges();
  });

  afterEach(() =>{
    httpTestingController.verify()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getAllProducts and return a list of products", () => {
    const mockResponse:ResponseProduct = { data:[{
      id: "1",
      name: "Cobro de Cheque",
      description: "Es una transacción  realizada en ventanilla",
      logo: "https://tse4.mm.bing.net/th/id/OIP.JQF5ttuSCKCxXp7iHME9TgAAAA?w=442&h=332&rs=1&pid=ImgDetMain",
      date_release: new Date("2024-02-01"),
      date_revision: new Date ("2024-02-04"),
    },
      
    ]
  };
     
    component.getDataProducts();
    expect(component.dataProducts).toEqual(mockResponse.data);
    expect(component.loading).toBe(false)
  });
});
