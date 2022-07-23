import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import SignaturePad from 'signature_pad';
// import { Router } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  
signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl : ElementRef;
  signatureImg: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit( ) {
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.modalCtrl.dismiss({
      'dismissed': true,
      image: this.signatureImg
    });
    // console.log("eee")?
  }


}
