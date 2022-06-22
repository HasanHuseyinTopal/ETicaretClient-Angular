import { Injectable } from '@angular/core';
declare var alertify : any;

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

 message(message:string,types:Partial<options>){
  alertify.set('notifier','delay',types.delay)
  alertify.set('notifier','position',types.position)
  alertify[types.messageType](message);
  if(types.state)
  alertify[types.messageType](message).dismissOthers()
 }
}
export class options {
  messageType:messagetype;
  position : position;
  delay:number;
  state:boolean;
}

export enum messagetype{
  error="error",
  success="success",
  message="message",
  warning="warning",
  notify="notify"
}
export enum position {
  TopCenter="top-center",
  TopRight="top-right",
  TopLeft="top-left",
  BottomCenter="buttom-center",
  ButtomRight="buttom-right",
  ButtomLeft="buttom-left"
}
