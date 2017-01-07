import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/profile';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { MessagesPage} from '../messages/messages';
import { AnnouncementsPage } from '../announcements/announcements';
import { NewsPage } from '../news/news';
import { PartnersPage } from '../partners/partners';
import { ContactUsPage } from '../contact-us/contact-us';
import { AboutUsPage } from '../about-us/about-us';
import { SchoolsPage } from '../schools/schools';
import { ChatsPage } from '../chats/chats';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(public nav: NavController) {
    this.nav = nav;
  }

  goToProfile(){
    this.nav.push(UserProfilePage);
  }

  goToMenuTabs(){
    this.nav.push(MenuTabsPage);
  }

  goToMyMessages(){
    this.nav.push(ChatsPage);
  }

  goToSapAnnouncements(){
    this.nav.push(AnnouncementsPage);
  }

  goToNews(){
    this.nav.push(NewsPage);
  }

  goToPartners(){
    this.nav.push(PartnersPage);
  }

  goToContactUs(){
    this.nav.push(ContactUsPage);
  }

  goToAboutUs(){
    this.nav.push(AboutUsPage);
  }

  goToSchools(){
    this.nav.push(SchoolsPage);
  }

  goToChats(){
    this.nav.push(ChatsPage);
  }


}
