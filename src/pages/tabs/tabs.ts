import { Component } from '@angular/core';
import { HomePage } from "../home/home";
import {ProfilePage } from "../profile/profile";
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { EventsPage } from '../events/events';
import { AnnouncementsPage } from '../announcements/announcements';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeTab = HomePage;
  profileTab = ProfilePage;
  menuTabsTab = MenuTabsPage;
  eventsTab =EventsPage;
  announcementsTab = AnnouncementsPage;
  
}
