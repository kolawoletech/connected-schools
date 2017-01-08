import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs';
import { LoginComponent } from '../auth/login';

@Component({
  templateUrl: 'chat-root.html'
})
export class ChatRoot {
  rootPage: any;

  constructor() {
    this.rootPage = Meteor.user() ? TabsPage : LoginComponent;

  }
}
