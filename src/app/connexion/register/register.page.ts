import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  levels: any = [];
  hasLoadedLevels: boolean = false;
  data = {
    name: '',
    email: '',
    password: '',
    role: '',
    level_id: 1,
  }
  constructor( public router: Router, private http: HTTP) {
    this.getData();
  }

  ngOnInit() {
  }

   async direct(){
    this.router.navigate(['/login']);
  }

  async register(){

    this.http.post('https://aware-backend.herokuapp.com/api/register', this.data, {}).then((e) => {
      //  console.log(e);
      //  this.direct();
      // localStorage.setItem('userinfo', JSON.stringify(e));
      Storage.set({key: 'userinfo', value: JSON.stringify(e.data)})
     },
     (err) => {
       console.log(err);
     })
  }
  async getData() {
    // let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    const { value } = await Storage.get({ key: 'userinfo' });
    const userinfo = JSON.parse(value);
    const token = userinfo?.access_token;
    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });

    // const requestOptions = { headers: headers };

    this.http.get('https://aware-backend.herokuapp.com/api/level', {}, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }).then((e) => {
      this.levels = JSON.parse(e.data);
      this.hasLoadedLevels = true;
    },
    (err) => {
      console.log(err);
      this.hasLoadedLevels = false;
    })
  }

}
