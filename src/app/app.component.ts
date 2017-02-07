import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar, Network, Splashscreen} from 'ionic-native';
import { AngularFire } from 'angularfire2';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth-provider';
import {UtilProvider} from '../providers/utils';
import { Push,PushToken} from '@ionic/cloud-angular';





@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage:any;

 

  constructor(platform: Platform, public af: AngularFire, public authProvider:AuthProvider, public toastCtrl:ToastController, public up:UtilProvider, public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
    StatusBar.styleDefault(); 
      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
      });

    this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });
      
      
    });
      this.intialize();
      
      this.hideSplashScreen();
  }



  hideSplashScreen(){
    if(Splashscreen){
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
    
  }
  intialize() {
    this.af.auth.subscribe(auth => {
       if(auth) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }

        
    });

    let toast = this.up.getToast("You are not connected to Internet.");
    this.toastCtrl.create(toast);
      let disconnectSubscription = Network.onDisconnect().subscribe(() => {
      //this.nav.present(toast);
       this.toastCtrl.create(toast);
       toast.present();
    });
    
  }
}
