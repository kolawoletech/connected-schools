import {Injectable} from '@angular/core';
import {LoadingController, ToastController, AlertController} from 'ionic-angular';

@Injectable()
 
export class UtilProvider {
constructor(public  loadingCtrl: LoadingController, public  toastCtrl: ToastController,public  AlertCtrl: AlertController) { }
   getLoader(content) {
        let loading = this.loadingCtrl.create({
            content: content,
            duration: 3000
        });
        return loading;
    }
    
    getToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        return toast;
    }
    doAlert(title, message, buttonText) {
      console.log(message);
      let alert = this.AlertCtrl.create({
          title: title,
          subTitle: message,
          buttons: [buttonText]
      });
      return alert; 
    }    
}
