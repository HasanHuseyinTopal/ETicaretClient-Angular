import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastrService:ToastrService) { }

  ShowMessage(title:string,message:string,options : Partial<ToastrOptions>){
    this.toastrService[options.ToastrTypes](title,message,{positionClass:options.ToastrPosition})
  }

}

export class ToastrOptions{
  ToastrTypes : toastrTypes;
  ToastrPosition : toastrPosition;
}
export enum toastrTypes{
Error="error",
Info ="info",
Success="success",
Warning="warning"
}
export enum toastrPosition{
TopRight = "toast-top-right",
BottomCenter = "toast-bottom-center"
}
