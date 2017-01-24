import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { PostCmp } from '../../components/post/post';
import { PostsPage } from '../posts/posts';
import { WpProvider } from '../../providers/wp-provider';
import { UtilProvider } from '../../providers/utils';
import { WpPage } from '../wp-page/wp-page';

/*
  Generated class for the Announcements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html'
})
export class AnnouncementsPage {

  list:Array<any>;
  constructor(public nav:NavController, public wp:WpProvider, public up:UtilProvider,public alertCtrl:AlertController) {
    
    
    let loader = this.up.getLoader("Loading Categories");
    this.alertCtrl.create(loader);
    this.wp.getCategories()
    .subscribe(data => {
      this.list = data;
      console.log(data);
      loader.dismiss();
    }, ()=> {
      loader.dismiss();
    })

  }

  
  
  openCategory(category) {
    this.nav.push(PostsPage, {"category": category});
  }
    
 
  


}
