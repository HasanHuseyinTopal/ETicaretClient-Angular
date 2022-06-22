import { Component, OnInit } from '@angular/core';
import {AfterViewInit,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { list_Product } from 'src/app/contracts/List_Products';
import { AlertifyService, messagetype } from 'src/app/service/alertify.service';
import { ProductService } from 'src/app/service/common/model/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private productService:ProductService,private alertify:AlertifyService) { 
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'stock', 'price','createdDate','updatedDate','Delete'];
  dataSource :MatTableDataSource<list_Product>=null; 
  @ViewChild(MatPaginator) paginator:MatPaginator;
  
  async ngOnInit() {
    await this.getProducts();
  }
    
  async getProducts() {
    this.showSpinner(spinnerType.BallAtom);
    const allProducts : {product:list_Product[],totalCount:number}= await this.productService.getAll(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,()=>{},(errorMessage)=>{})
    this.dataSource= new MatTableDataSource<list_Product>(allProducts.product);
    this.paginator.length=allProducts.totalCount;
  }

  async pageChanced(){
    await this.getProducts()
  }
}
