import { Component, Input, Output, EventEmitter} from '@angular/core';
import {SocialSharing} from 'ionic-native';


import 'rxjs/add/operator/map';
import { ProfilePage } from '../profile/profile';
import { MenuTabsPage } from '../menu-tabs/menu-tabs';
import { ChatsPage} from '../chats/chats';
import { AnnouncementsPage } from '../announcements/announcements';
import { NewsPage } from '../news/news';
import { PartnersPage } from '../partners/partners';
import { ContactUsPage } from '../contact-us/contact-us';
import { AboutUsPage } from '../about-us/about-us';
import { SchoolsPage } from '../schools/schools';
import {PostDetail} from '../post-detail/post-detail';


import {CommonModule} from '@angular/common';
import {AlertController, NavController, NavParams, Modal, LoadingController, ToastController, Events} from 'ionic-angular';
import  {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/Rx';
import {PostCmp} from '../../components/post/post';
import {PostPage} from '../post/post';

import {WpProvider} from '../../providers/wp-provider';
import {UtilProvider} from '../../providers/utils';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @Input() postData;

  hideSearch:Boolean = true;
  authorData = {};
  searchbar:CommonModule = new CommonModule();
  pageCount:number = 1;
  favoriteList = [];
  getData = true;
  sort:string;
  noMore:Boolean = false;
  posts:any;
  storage = new Storage();
  category:any = {};
  query:{};
  
  constructor( public toastCtrl:ToastController, public nav:NavController, public params:NavParams, public alertCtrl:AlertController,public loadingCtrl:LoadingController, public wp:WpProvider, public up:UtilProvider, public events: Events) {
    this.category = this.params.get('category');

    // Getting Settings
    this.storage.get('settings')
    .then(data => {
     // this.sort = JSON.parse(data).sort;
      let query = this.createQuery();
      this.getPosts(query);
    });
    
    // If Sort Order Changed
    this.events.subscribe("sort:changed", value => {
      this.resetSettings();
      this.sort = value;
      let query = this.createQuery();
      this.getPosts(query);
    });
  }
  
  getPosts(query) {
    let loader = this.up.getLoader("Loading Posts...");
    this.loadingCtrl.create(loader);
    loader.present();
    
    this.wp.getPosts(query)
    .subscribe(posts => {
      this.posts = posts;
      console.log(this.posts);
      loader.dismiss();
    }, (error) => {
      loader.dismiss();
    });
    
  }

  doRefresh(refresher) {
  let query = this.createQuery();
    setTimeout(() => {
       this.getPosts(query);
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  loadMore(infinteScroll) {
    this.pageCount++;
    let query = this.createQuery();
      
    let toast = this.up.getToast("There are no more posts.");
    this.wp.getPosts(query)
    .subscribe(posts => {
      infinteScroll.complete();
      if(posts.length < 1) { 
       this.noMore = true;
       infinteScroll.enable(!this.noMore);
       this.toastCtrl.create(toast);
       toast.present();
      } else {
        this.posts = this.posts.concat(posts);
      }
    });
  }


  toggleSearch() {
    this.hideSearch = !this.hideSearch;
  }
  
  read(data) {
    this.nav.push(PostPage, {postData: data});
  }
  
  favorite(post) {
    let newPost:Boolean = true;
    let toast;
    let message:string;
    this.favoriteList.forEach(favPost => {
      if(JSON.stringify(favPost) === JSON.stringify(post)) {
        newPost = false;
      }
    });
    
    if(newPost) {
      this.favoriteList.push(post);
      this.storage.set('favorite', JSON.stringify(this.favoriteList));
      message = "This Post is saved in Favorite List";
    } else {
      message = "This Post is already in Favorite List";
    }
    toast = this.up.getToast(message);
    this.toastCtrl.create(toast);
  }
  

  resetSettings() {
    this.noMore = false;
    this.pageCount = 1;
  }

  createQuery() {
    let query = {};
    query['page'] = this.pageCount;
/*    if(this.sort) {
      query['order'] = this.sort;
    }*/
/*    if(this.searchbar) {
      query['search'] = this.searchbar;
    }*/
    if(this.category) {
      query['categories'] = this.category.id;
    }
    return query;
  }

   shareBtn() {
        let title = this.postData.title.rendered;
        let author = this.authorData['name'];
        let message = `Read this post on ${title} by ${author}.`;
        let url = this.postData.link;
        
        SocialSharing.share(message,"Read this post", null, url);
    }


}
