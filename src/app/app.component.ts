import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth-provider';

import firebase from 'firebase';



@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})

export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, public af: AngularFire, public authProvider:AuthProvider) {
/*    firebase.initializeApp({
    apiKey: "AIzaSyDjZNVUpzqUoVqa8nhYab50xB35KBaw0LA",
    authDomain: "connected-schools.firebaseapp.com",
    databaseURL: "https://connected-schools.firebaseio.com",
    storageBucket: "connected-schools.appspot.com",
    messagingSenderId: "224090873526"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = LoginPage;
      }
    });*/

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this. intialize();
    });


  }


  intialize() {
    this.af.auth.subscribe(auth => {
       if(auth) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
    });
  }
}
