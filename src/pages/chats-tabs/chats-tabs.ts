import { Component } from '@angular/core';
import { ChatsPage } from '../chats/chats'; 
import { AccountPage } from '../account/account';
import { UsersPage } from '../users/users';

@Component({
	selector: 'page-chats',
	templateUrl: 'chats-tabs.html'
})
export class ChatsTabsPage {
	users = UsersPage;
	chats = ChatsPage;	
    profile = AccountPage;
}