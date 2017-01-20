import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { UtilProvider } from '../../providers/utils';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators,FormGroup, FormControl } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { validateEmail } from '../../validators/email';
import { AuthProvider } from '../../providers/auth-provider';
import { EmailValidator } from '../../validators/email';
import { UserProvider } from '../../providers/user-provider';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm : any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;


  constructor(public nav: NavController, 
    public authData: AuthData, 
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public auth: AuthProvider, 
    public userProvider: UserProvider,
    public util: UtilProvider,
    public storage:Storage) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    let credentials = this.signupForm.value;
    this.submitAttempt = true;

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.auth.createAccount(credentials)
      .then((data) => {
        this.storage.set('uid', data.uid);
        this.userProvider.createUser(credentials, data.uid);
        this.nav.push(TabsPage);
      }, (error) => {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}