import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Storage } from '@capacitor/storage';

import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  levels: any = [];
  hasLoadedLevels: boolean = false;
  hasLoadedStudents: boolean = false;
  students: any = [];
  userData: any;
  formPresence: FormGroup;
  possiblesStudents: any = [];

  data = {
    students: '',
    level_id: '',
  }
  constructor(private formBuilder: FormBuilder, public router: Router, public modalController: ModalController, private http: HTTP)
{
  this.formPresence = this.formBuilder.group({
    students: ['', Validators.required],
    name: ['', Validators.required],
    level_id: ['', Validators.required],
  });

    this.formPresence.get("level_id").valueChanges.subscribe(value => {
      console.log(value)
      let teachingUnits = this.students.filter((elt) => {
        return elt.level.id === parseInt(value);
      });

      if (this.possiblesStudents.length > 0) {
        this.formPresence.get("students").setValue(teachingUnits[0].id);
      }
      else {
        this.formPresence.get("students").setValue(null);
      }
    });


    this.getData();
}

  get formValue() {
    return this.formPresence.value;
  }


  get possiblesStudent() {
    let temp = this.students.filter(elt => true);

    if (this.formValue.level_id && this.formValue.level_id !== '') {
      temp = temp.filter(elt => elt.level.id.toString() === this.formValue.level_id);
    }
    return temp;
  }
  async direct(){
  this.router.navigate(['/etudiant']);
  }
 async getData() {
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
     console.log(JSON.parse(e.data));
     this.levels = JSON.parse(e.data);
     this.hasLoadedLevels = true;
   },
     (err) => {
       console.log(err);
       this.hasLoadedLevels = false;
     })

   this.http.get('https://aware-backend.herokuapp.com/api/student', {}, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }).then((e) => {
      console.log(JSON.parse(e.data));
      this.students = JSON.parse(e.data);
      this.hasLoadedStudents= true;
    },
    (err) => {
      console.log(err);
      this.hasLoadedStudents = false;
    })
  }

  drop(i : number){
    console.log('test');
    if(confirm('vous etes sur de vouloir supprimer')){
      this.userData.splice(i, 1);
      localStorage.setItem('id', JSON.stringify(this.userData));
    }
  }

  async closeModal(){
    await this.modalController.dismiss();
  }
  // filterArray(ev:any)
  // {
  //     this.arr=this.arr1;
  //     const val = ev.target.value;
  //     if(val && val.trim() != ""){
  //       this.arr = this.arr1.filter((item)=>{
  //         return (item.id.toLowerCase().indexOf(val.toLowerCase()) > -1  || item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.matricule.toLowerCase().indexOf(val.toLowerCase())> -1 || item.contact.toLowerCase().indexOf(val.toLowerCase())>-1)
  //       })
  //     }
  // }
}
