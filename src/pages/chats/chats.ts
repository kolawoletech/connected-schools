import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { UserProvider } from '../../providers/user-provider';
import { ChatsProvider } from '../../providers/chats-provider';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';
import { ChatViewPage }  from '../chat-view/chat-view';

/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
    chats:Observable<any[]>;
    constructor(public chatsProvider: ChatsProvider, 
        public userProvider: UserProvider, 
        public af:AngularFire, 
        public nav: NavController) {
            
            this.chatsProvider.getChats()
            .then(chats => {
                this.chats = chats.map(users => {
                    return users.map(user => {
                        user.info = this.af.database.object(`/users/${user.$key}`);
                        return user;
                    });
                });
            });
        }
    
    
    openChat(key) {
        this.userProvider.getUid()
        .then(uid => {
            let param = {uid: uid, interlocutor: key};
            this.nav.push(ChatViewPage,param);
        });   
    }

}