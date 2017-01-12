import { Component } from '@angular/core';
import { HomePage } from "../home/home";
import {ProfilePage } from "../profile/profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homeTab = HomePage;
  profileTab = ProfilePage;

  constructor() {

  }
}
