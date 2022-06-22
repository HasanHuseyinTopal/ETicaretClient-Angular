import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListComponent } from 'src/app/admin/components/products/list/list.component';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { list_Product } from 'src/app/contracts/List_Products';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async getAll(page:number=0,size:number=5,successCallBack?: ()=> void,errorCallBack?:(error:string)=> void) :Promise<{product:list_Product[],totalCount:number}>{
    const promiseData:Promise<{product:list_Product[],totalCount:number}>= this.httpClientService.get<{product:list_Product[],totalCount:number}>({controller:"products",queryString :`page=${page}&size=${size}`}).toPromise();
    promiseData.then(data=> successCallBack()).catch((errorResponsse:HttpErrorResponse)=>errorCallBack(errorResponsse.message))

    return await promiseData;
  }
}
