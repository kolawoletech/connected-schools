import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { AngularFire } from 'angularfire2';

@Injectable()
export class ProfileData {
  public userProfile: any;
  public currentUser: any;


  constructor(public af:AngularFire, public local:Storage) {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');

  }

  getUid() {
    return this.local.get('uid');
  }
  
  // Create User in Firebase
  createUser(userCredentails, uid) {
      let currentUserRef = this.af.database.object(`/users/${uid}`);
      console.log(userCredentails);
      currentUserRef.set({email: userCredentails.email});
  }
  
  // Get Info of Single User
  getUser() {
    // Getting UID of Logged In User
    return this.getUid().then(uid => {
      return this.af.database.object(`/users/${uid}`);
    });
  }


  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  getPicture() {
      let base64Picture;
      let options = {
          destinationType: 0,
          sourceType: 0,
          encodingType:0  
      };
      
      let promise = new Promise((resolve, reject) => {
           Camera.getPicture(options).then((imageData) => {
                base64Picture = "data:image/jpeg;base64," + imageData;
                resolve(base64Picture);
            }, (error) => {
                reject(error);
          });
      
      });
      return promise;
  }
  
  // Update Provide Picture of User
  updatePicture() {
    this.getUid().then(uid => {
      let pictureRef = this.af.database.object(`/users/${uid}/picture`);
      this.getPicture()
      .then((image) => {
          pictureRef.set(image);
      });
    });
  }

  updateName(firstName: string, lastName: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateDOB(birthDate: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  updateEmail(newEmail: string): any {
    this.currentUser.updateEmail(newEmail).then(() => {
      this.userProfile.child(this.currentUser.uid).update({
        email: newEmail
      });
    }, (error) => {
      console.log(error);
    });
  }


  updatePassword(newPassword: string): any {
    this.currentUser.updatePassword(newPassword).then(() => {
      console.log("Password Changed");
    }, (error) => {
      console.log(error);
    });
  }

}
