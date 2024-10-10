import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SimpleChanges } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [FormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchProduct when dataTable changes', () =>{
    const searchProductSpy = jest.spyOn(component, 'searchProduct');

    const changes:SimpleChanges = {
      dataTable:{
        currentValue:{},
        firstChange:true,
        previousValue:null,
        isFirstChange:() => true
      }
    };
    component.ngOnChanges(changes);

    expect(searchProductSpy).toHaveBeenCalled()
  });
  it('should set productFiltered to dataTable when filterName es empty', () =>{
    component.dataTable = [
      {
        id:'1',
        name:'Product1',
        logo:'',
        description:'Crédito',
        date_revision: new Date('2024-10-10'),
        date_release: new Date ('2025-10-10') 
      }
    ];

    component.filterName='';
    component.searchProduct();

    expect(component.productFiltered).toEqual(component.dataTable)
  });

  it('should filter products by filterName and limit results to select', () =>{
    component.dataTable =[
      {
        id:'1',
        name:'Product 1',
        logo:'',
        description:'Crédito de consumo',
        date_revision: new Date('2024-10-10'),
        date_release: new Date ('2025-10-10') 
      },
      {
        id:'2',
        name:'Product 2',
        logo:'',
        description:'Tarjeta de Debito',
        date_revision: new Date('2024-10-10'),
        date_release: new Date ('2025-10-10') 
      },
      {
        id:'3',
        name:'Another',
        logo:'',
        description:'Tarjeta de Debito',
        date_revision: new Date('2024-10-10'),
        date_release: new Date ('2025-10-10') 
      }
    ];

    component.filterName = 'product';
    component.select = 2;

    component.searchProduct();

    expect(component.productFiltered).toEqual([
        {
          id:'1',
          name:'Product 1',
          logo:'',
          description:'Crédito de consumo',
          date_revision: new Date('2024-10-10'),
          date_release: new Date ('2025-10-10') 
        },
        {
          id:'2',
          name:'Product 2',
          logo:'',
          description:'Tarjeta de Debito',
          date_revision: new Date('2024-10-10'),
          date_release: new Date ('2025-10-10') 
        },
        
    ]);
  });
});
