import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VaslidarCamposService {

  constructor() { }

  hasErrorValidar(control: AbstractControl, errorName: string):boolean{
    if((control.dirty || control.touched) && this.hasError(control,errorName)){
      return true;
    }
    return false;
  }
  hasError(control: AbstractControl, errorName: string):boolean{
    return control.hasError(errorName);
  }
}
