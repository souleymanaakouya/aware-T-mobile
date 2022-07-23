import { Component, OnInit } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import SignaturePad from 'signature_pad';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@capacitor/storage';



@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.page.html',
  styleUrls: ['./etudiant.page.scss'],
})
export class EtudiantPage implements OnInit {
// data = {
  //   name: '',
  //   matricule: '',
  //   level_id: 1,
  // }
    hasLoadedLevels: boolean = false;
    levels: any = [];
    formPresence:FormGroup;

constructor(
  public modalController: ModalController,
  private http: HTTP,
  private popoverController: PopoverController,
  private formBuilder: FormBuilder)
{
this.formPresence = this.formBuilder.group({
      name: ['',Validators.required],
      matricule: ['',Validators.required],
      level_id: ['',Validators.required],

    })
}


  ngOnInit() {
        this.getData();
  }

  async getData() {
    // let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    // let token = userinfo?.access_token;
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
      this.hasLoadedLevels = false
    })
  }

 get formValue(){
  return this.formPresence.value;
}

async enregistrer() {

    console.log(this.formPresence)
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


      // let formData = new FormData();
      // formData.append('name', this.formValue.name);
      // formData.append('matricule', this.formValue.matricule);
      // formData.append('level_id', this.formValue.level_id);


      const bodyData = {
        name: this.formValue.name,
        matricule: this.formValue.matricule,
        level_id: this.formValue.level_id,

      }

  this.http.post('https://aware-backend.herokuapp.com/api/student', bodyData, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      } ).then((e) => {
      console.log(JSON.parse(e.data));
    },
    (err) => {
      console.log(err);
    })

  }
  async closeModal(){
    await this.modalController.dismiss();
  }
}
