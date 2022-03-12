import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {
  }

  success(text: string): void {
    this.toast(text,'information-circle','primary',2000);
  }

  error(text: string): void {
    this.toast(text,'alert-circle-outline','warning',5000);
  }

  private async toast(text:string,icon:string,color:string,duration:number) {
    const toast = await this.toastController.create({
      message: text,
      icon: icon,
      position: 'bottom',
      color:color,
      duration:2000
    });

    await toast.present();
  }
}
