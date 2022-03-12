import {Directive, ElementRef, Input, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appBtnLoading]'
})
export class BtnLoadingDirective {
  @Input() appBtnLoading: boolean;
  @Input() btnLoadingText: string = null;
  initialInnerHTML: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.initialInnerHTML) {

      if (this.appBtnLoading) {
        this.el.nativeElement.innerHTML = `<ion-spinner></ion-spinner>`;
        this.el.nativeElement.disabled = true;
      } else {
        this.el.nativeElement.innerHTML = this.initialInnerHTML;
        this.el.nativeElement.disabled = false;
      }

    }

    if(this.btnLoadingText)
      this.initialInnerHTML = this.btnLoadingText;

    //saves initial innerHTML for later
    if (!this.initialInnerHTML && !this.btnLoadingText)
      this.initialInnerHTML = this.el.nativeElement.innerHTML;
  }


}
