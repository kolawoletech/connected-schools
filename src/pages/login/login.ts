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
import { HomePage } from '../home/home';

import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: any;
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

    /**
     * Creates a ControlGroup that declares the fields available, their values and the validators that they are going
     * to be using.
     *
     * I set the password's min length to 6 characters because that's Firebase's default, feel free to change that.
     */


    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  /**
   * If the form is valid it will call the AuthData service to log the user in displaying a loading component while
   * the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  loginUser(){

    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.auth.signin(this.loginForm.value)
      .then( (data) => {
        this.storage.set('uid', data.uid);
        this.nav.push(TabsPage);
      }, error => {
        this.loading.dismiss().then( () => {
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
      });
      
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToSignup(){
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

}
