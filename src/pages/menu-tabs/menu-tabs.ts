import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ChatsPage} from '../chats/chats';
import { AnnouncementsPage } from '../announcements/announcements';
import { NewsPage } from '../news/news';
import { PartnersPage } from '../partners/partners';
import { ContactUsPage } from '../contact-us/contact-us';
import { AboutUsPage } from '../about-us/about-us';
import { SchoolsPage } from '../schools/schools';
import { Http } from '@angular/http';
import { PostCmp } from '../../components/post/post';
import { PostsPage } from '../posts/posts';
import { WpProvider } from '../../providers/wp-provider';
import { UtilProvider } from '../../providers/utils';


@Component({
  selector: 'page-menu-tabs',
  templateUrl: 'menu-tabs.html',
})
export class MenuTabsPage {

  list:Array<any>;
  constructor(public nav:NavController, public wp:WpProvider, public up:UtilProvider,public alertCtrl:AlertController,) {
    let loader = this.up.getLoader("Loading Categories");
    this.alertCtrl.create(loader);
    this.wp.getCategories()
    .subscribe(data => {
      this.list = data;
      loader.dismiss();
    }, ()=> {
      loader.dismiss();
    })
    
  }
  
  openCategory(category) {
    this.nav.push(PostsPage, {"category": category});
  }

  goToProfile(){
    this.nav.push(ProfilePage);
  }


  goToChats(){
    this.nav.push(ChatsPage);
  }

  goToSapAnnouncements(){
    this.nav.push(AnnouncementsPage);
  }

  goToNews(){
    this.nav.push(NewsPage);
  }

  goToPartners(){
    this.nav.push(NewsPage);
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
}
