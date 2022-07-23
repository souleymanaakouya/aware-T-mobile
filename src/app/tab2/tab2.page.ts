import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  hasLoadedCours: boolean = false;
  cours: any = [];
  levels: any = [];
  hasLoadedLevels: boolean = false;
  hasLoadedStudents: boolean = false;
  userData: any;
  formPresence: FormGroup;
  possiblesStudents: any = [];

  users = {
    name: '',
    email: '',
    level_id: '',
  };

  constructor(private formBuilder: FormBuilder,private menu: MenuController, private router: Router, public http: HTTP, private modalController: ModalController) {
    this.formPresence = this.formBuilder.group({
      students: ['', Validators.required],
      name: ['', Validators.required],
      level_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    // let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    // let token = userinfo?.access_token;
    const { value } = await Storage.get({ key: 'userinfo' });
    const userinfo = JSON.parse(value);
    const token = userinfo?.access_token;
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });
    // // console.log()
    // const requestOptions = { headers: headers };

    this.http.get('https://aware-backend.herokuapp.com/api/course', {}, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }).then((e) => {
      console.log(JSON.parse(e.data));
      this.cours = JSON.parse(e.data);
      this.hasLoadedCours = true;
    },
      (err) => {
        console.log(err);
        this.hasLoadedCours = false;
      });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  async direct(){
    this.router.navigate(['/profile']);
  }


  async ver(){
    this.router.navigate(['/etudiant']);
  }
}

