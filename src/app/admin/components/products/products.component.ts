import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  implements OnInit {

  constructor() {}
  @ViewChild(ListComponent) listComponent : ListComponent;
  
  createdProduct(data:Create_Product){
    this.listComponent.getProducts();
  }
  ngOnInit(): void {
  }
}

