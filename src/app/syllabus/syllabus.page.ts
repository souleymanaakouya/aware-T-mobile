// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { MymodalPage } from '../mymodal/mymodal.page';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.page.html',
  styleUrls: ['./syllabus.page.scss'],
})
export class SyllabusPage implements OnInit {
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

  constructor(private formBuilder: FormBuilder, private menu: MenuController, private router: Router, public http: HTTP, private modalCtrl: ModalController) {
    this.formPresence = this.formBuilder.group({
      students: ['', Validators.required],
      name: ['', Validators.required],
      level_id: ['', Validators.required],
    });

    this.formPresence.get("level_id").valueChanges.subscribe(value => {
      console.log(value)
      let teachingUnits = this.cours.filter((elt) => {
        return elt.level.id === parseInt(value);
      });

      if (this.possiblesCourses.length > 0) {
        this.formPresence.get("course_id").setValue(teachingUnits[0].id);
      }
      else {
        this.formPresence.get("course_id").setValue(null);
      }
    });
  }

  get possiblesCourses() {
    let temp = this.cours.filter(elt => true);

    if (this.formValue.level_id && this.formValue.level_id !== '') {
      temp = temp.filter(elt => elt.level.id.toString() === this.formValue.level_id);
    }
    return temp;
  }
  get formValue() {
    return this.formPresence.value;
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

    this.http.get('https://aware-backend.herokuapp.com/api/course', {},  {
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

    this.http.get('https://aware-backend.herokuapp.com/api/level', {}, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }).then((e) => {
      console.log(JSON.parse(e.data));
      this.levels = JSON.parse(e.data);
      this.hasLoadedLevels = true;
    },
      (err) => {
        console.log(err);
        this.hasLoadedLevels = false;
      })
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
  async direct() {
    this.router.navigate(['/profile']);
  }


  async ver() {
    this.router.navigate(['/etudiant']);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MymodalPage,
      componentProps: {
      }
    });
    modal.present();
  }

}
