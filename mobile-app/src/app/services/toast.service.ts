import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {
  }

  /**
   * Trigger success toast
   * @param text
   */
  success(text: string): void {
    this.toast(text,'information-circle','primary',2000);
  }

  /**
   * Trigger error toast
   * @param text
   */
  error(text: string): void {
    this.toast(text,'alert-circle-outline','warning',5000);
  }

  /**
   * Generate toast
   * @param text
   * @param icon
   * @param color
   * @param duration
   * @private
   */
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
