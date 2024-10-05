import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges{
  @Input() dataTable:Product[]=[]

  select:number = 1;
  filterName:string='';
  productFiltered:Product[]=[]
  dateCurrent:string[]=[]

  optionSelect = [5, 10 ,20]


  ngOnInit(): void {
    this.converterDate()
  }
 ngOnChanges(changes:SimpleChanges):void{
  if(changes['dataTable']){
    this.searchProduct()
  }
 }

 searchProduct():void{
if(!this.filterName){
  this.productFiltered= this.dataTable
} else{
  this.productFiltered= this.dataTable.filter((product) => product.name.toLowerCase().indexOf(this.filterName.toLowerCase()) > -1) 
}

this.productFiltered = this.productFiltered.slice(0, this.select)
 }


 converterDate() {
  const dateData = [
    "2024-02-01T00:00:00.000+00:00",
    "2024-02-04T00:00:00.000+00:00",
  ];
  this.dateCurrent = dateData.map((dateData) => {
    const date = new Date(dateData);
    return date.toLocaleDateString();
  });
}
}
