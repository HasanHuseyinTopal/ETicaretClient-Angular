import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { AlertifyService, messagetype, position } from 'src/app/service/alertify.service';
import { ProductService } from 'src/app/service/common/model/product.service';
import { CustomToastrService, toastrPosition, toastrTypes } from 'src/app/ui/service/Customtoastr.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private ProductService : ProductService,spinner : NgxSpinnerService,private toastr:CustomToastrService,private alertify:AlertifyService) {
    super(spinner)
   }

   @Output() createdProduct :EventEmitter<Create_Product> = new EventEmitter();
  ngOnInit(): void {
    }

    create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
      this.showSpinner(spinnerType.BallAtom);
      const create_product: Create_Product = new Create_Product();
      create_product.name = name.value;
      create_product.stock = parseInt(stock.value);
      create_product.price = parseFloat(price.value);
  
      this.ProductService.create(create_product, () => {
        this.hideSpinner(spinnerType.BallAtom);
        this.alertify.message("Ürün başarıyla eklenmiştir.", {
          state: true,
          messageType: messagetype.success,
          position: position.TopRight
        });
        this.createdProduct.emit(create_product);
      }, errorMessage => {
        this.alertify.message(errorMessage,
          {
            state: true,
            messageType: messagetype.error,
            position: position.TopRight
          });
      });
    }
 }


