import { NgxSpinnerService } from "ngx-spinner";



export class BaseComponent  {
  constructor(private spinner : NgxSpinnerService) { }

  showSpinner(spinnerType:spinnerType){
    this.spinner.show(spinnerType)
    setTimeout(() => {
      this.spinner.hide(spinnerType)
    }, 500);
  }
  hideSpinner(spinnerType:spinnerType){
    setTimeout(() => {
      this.spinner.hide(spinnerType)
    }, 500);
  }
}

export enum spinnerType{
  BallAtom = "s1",
  BallScaleMuliple ="s2",
  BallSpinClocwiseFadeRotating ="s3"
}
