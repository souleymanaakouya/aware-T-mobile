import { ProfPage } from './../pages/prof/prof.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

 constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {

    this.modalController.dismiss({
      dismissed: true
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ProfPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

   async closeModal(){
    await this.modalController.dismiss();
  }

}
