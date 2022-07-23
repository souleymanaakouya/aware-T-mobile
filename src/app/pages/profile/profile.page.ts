import { Component, OnInit } from '@angular/core';
// import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  users = {
    name: '',
    email: '',
    role:'',
    level:'',
    matricule: '',
  };

  constructor(public http: HTTP, private modalController: ModalController) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers(){
    // let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    // let token = userinfo?.access_token;
    const { value } = await Storage.get({ key: 'userinfo' });
    const userinfo = JSON.parse(value);
    const token = userinfo?.access_token;
    console.log(token);
    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //   // console.log()

    // const requestOptions = { headers: headers };
    this.http.get('https://aware-backend.herokuapp.com/api/profile', {}, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }).then((response: any)=>{
      console.log(JSON.parse(response.data));
      this.users = response;
    }, (error)=>{
        console.error(error);
    });
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
}
