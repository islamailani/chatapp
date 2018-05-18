import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

	headerdisplay : any;
	public passwordloginForm:FormGroup;  
  error : any;
  rut : any;
  appID : any;
  empresaID : any;
  JID : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, 
              private formBuilder: FormBuilder, public keyboard: Keyboard, public restProvider: RestProvider, public storage: Storage) {

    this.rut = this.navParams.get('rut');
    console.log("this.rut", this.rut);

    // this.storage.set('rutdata', this.rut);

  	this.passwordloginForm = formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.required])]
    });

  	if (this.plt.is('ios')) {
      // This will only print when on iOS
      console.log('I am an iOS device!');
      this.headerdisplay = true;
    } else if (this.plt.is('android')) {
    	this.headerdisplay = false;
      	console.log('I am an android device!');

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  onChange(){
    if(this.passwordloginForm.value.password.length > -1){
      this.error = '';
    }
  }

  passwordlogin(){
    console.log("this.passwordloginForm.value.password", this.passwordloginForm.value.password);

    let clave : any = this.passwordloginForm.value.password;
    console.log("clave", clave);
    console.log("rut", this.rut);

    // let loginData = {
    //   'rut' : this.rut,
    //   'clave' : clave
    // }

    // this.storage.set('logData', loginData);

    if(this.passwordloginForm.value.password == ''){
      this.error = "please enter your Password";
    } else{
      this.restProvider.getClaveData(this.rut, clave)
      .then(data => {
        // this.rut = data;
        console.log("clave api data", data);

        this.appID = data['appid'];
        this.storage.set('appId', this.appID);
        this.empresaID = data['idempresa'];
        this.storage.set('empresaId', this.empresaID);

        console.log("clave data error", data['error']);

        if(data['error']){
          this.error = data['error'];
        } else {
          this.storage.set('isLogin', true);
          console.log("data rut", data['RUT']);
          this.storage.set('RUT', data['RUT']);
          this.JID = data['JID'];
          console.log("this.JID ", this.JID);
          this.storage.set('senderJID', this.JID);

          this.navCtrl.push("MenuPage", {'Rut' : data['RUT']});
        }
      });
      
    }
  }
  resetpassword(){
    this.navCtrl.push("ResetpasswordPage");
  }

  // keyboardCheck() {
  //    return !this.keyboard.show();
  // }

}
