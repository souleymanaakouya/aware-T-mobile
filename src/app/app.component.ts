import { Component } from '@angular/core';
// import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  public pages: any[] = [
    {title: 'Acceuil', url: '/tabs/tab2', icon: 'home' },
    {title: 'Emargement', url: '/tabs/tab3', icon: 'list' },
    {title: 'Syllabus', url: '/syllabus', icon: 'book'},
    {title: 'Etudiant', url: '/tabs/tab1', icon: 'people'},
    {title: 'Professeur', url: '/listerprof', icon: 'people'},
  ];
  users = {
    name: '',
    email: '',
    role:''
  };
 constructor(public http: HTTP, private modalController: ModalController) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers(){
    //  let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    const { value } = await Storage.get({ key: 'userinfo' });
    const userinfo = JSON.parse(value);
    const token = userinfo?.access_token;
    // console.log(token);
    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });

    // const requestOptions = { headers: headers };
    this.http.get("https://aware-backend.herokuapp.com/api/profile", {}, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }).then((response: any)=>{
      // console.log(response);
      this.users = JSON.parse(response.data);
    }, (error)=>{
        console.error(error);
    });
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
}
