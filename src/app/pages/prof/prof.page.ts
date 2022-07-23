import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ListerprofPage } from '../listerprof/listerprof.page';
// import { ListerprofPage } from './listerprof.page';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-prof',
  templateUrl: './prof.page.html',
  styleUrls: ['./prof.page.scss'],
})
export class ProfPage implements OnInit {
  selectedValues: string[]=[];

   data = {
    name: '',
    email: '',
    phone: ''
  }

  constructor(public router: Router, private modalController: ModalController,private http: HTTP ) { }

  ngOnInit() {
  }

  async direct(){
    this.router.navigate(['/tabs']);
  }
  async voirprof(){
    this.router.navigate(['/listerprof']);
  }

  // async ouvrirModal(){
  //   const modal = await this.modalController.create({
  //     component: ListerprofPage,
  //     componentProps: {
  //     }
  //   });

  //   modal.onDidDismiss().then(res => {
  //     console.log(res);
  //   });
  //   modal.present();
  // }



  async closeModal(){
    await this.modalController.dismiss();
  }


  async enregistrer() {
    console.log(this.data);
    // let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    // let token = userinfo?.access_token;
    const { value } = await Storage.get({ key: 'userinfo' });
    const userinfo = JSON.parse(value);
    const token = userinfo?.access_token;
    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });

    //   const requestOptions = { headers: headers };


    this.http.post('https://aware-backend.herokuapp.com/api/professor', this.data, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }).then((e) => {
      console.log(JSON.parse(e.data));
    },
    (err) => {
      console.log(err);
    })
  }
}
