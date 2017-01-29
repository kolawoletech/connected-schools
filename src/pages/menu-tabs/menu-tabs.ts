import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PartnersPage } from '../partners/partners';
import { ContactUsPage } from '../contact-us/contact-us';
import { AboutUsPage } from '../about-us/about-us';
import { SchoolsPage } from '../schools/schools';
import { WpProvider } from '../../providers/wp-provider';
import { UtilProvider } from '../../providers/utils';
import { WpPage } from '../wp-page/wp-page';

@Component({
  selector: 'page-menu-tabs',
  templateUrl: 'menu-tabs.html',
})
export class MenuTabsPage {
  icons:Array<any>;
  list:Array<any>;
  pages:Array<any>;
  constructor(public nav:NavController, public wp:WpProvider, public up:UtilProvider,public alertCtrl:AlertController) {
    let loader = this.up.getLoader("Loading Categories");
    this.alertCtrl.create(loader);

    this.wp.getPages()
    .subscribe(pages => {
        this.pages = pages;
        loader.dismiss();
    }, ()=> {
        loader.dismiss();
    }); 
  }


  openPage(page) {
      this.nav.push(WpPage, {page: page});
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
}
