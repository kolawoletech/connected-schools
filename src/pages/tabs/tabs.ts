import { Component } from '@angular/core';
import { HomePage } from "../home/home";
import {ProfilePage } from "../profile/profile";
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { MessagesPage} from '../messages/messages';
import { AnnouncementsPage } from '../announcements/announcements';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeTab = HomePage;
  profileTab = ProfilePage;
  menuTabsTab = MenuTabsPage;
  messagesTab = MessagesPage;
  announcementsTab = AnnouncementsPage;
  
  constructor() {

  }
}
