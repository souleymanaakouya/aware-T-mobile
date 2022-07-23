import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-listerprof',
  templateUrl: './listerprof.page.html',
  styleUrls: ['./listerprof.page.scss'],
})
export class ListerprofPage implements OnInit {

  hasLoadedEnseignants: any = [];
  enseignants: any = [];
  userData: any;

  constructor( private http: HTTP,private modalController: ModalController) {
        this.getData();
   }

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss();
  }

   async getData() {
    // let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    //  let token = userinfo?.access_token;
    const { value } = await Storage.get({ key: 'userinfo' });
    const userinfo = JSON.parse(value);
    const token = userinfo?.access_token;
     console.log(token);
    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });

    // const requestOptions = { headers: headers };

     this.http.get('https://aware-backend.herokuapp.com/api/professor', {}, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }).then((e) => {
      console.log(JSON.parse(e.data));
      this.enseignants = JSON.parse(e.data);
      this.hasLoadedEnseignants= true;
    },
    (err) => {
      console.log(err);
      this.hasLoadedEnseignants = false;
    })
  }


}
