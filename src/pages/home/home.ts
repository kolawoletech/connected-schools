import { Component } from '@angular/core';


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
import {AlertController, NavController, NavParams, Modal, Loading, ToastController, Events} from 'ionic-angular';
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
 hideSearch:Boolean = true;
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
  constructor( public toastCtrl:ToastController, public nav:NavController, public params:NavParams, public alertCtrl:AlertController, public wp:WpProvider, public up:UtilProvider, public events: Events) {
    this.category = this.params.get('category');

    // Getting Favorite List
    this.storage.get('favorite')
    .then(data => {
        if(data === null) {
            data = "[]";
        }
        this.favoriteList = JSON.parse(data);
    });
    
    // Getting Settings
    this.storage.get('settings')
    .then(data => {
     // this.sort = JSON.parse(data).sort;
      let query = this.createQuery();
      this.getPosts(query);
    });
    
    
    // Search Subscription
/*    this.searchbar.valueChanges
    .debounceTime(2000)
    .filter(value => value.length === 0 || value.trim().length > 2)
    .distinctUntilChanged()
    .subscribe((value)=> {
      this.resetSettings();
      let query = this.createQuery();
      this.getPosts(query);
    });*/
    
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
    this.alertCtrl.create(loader);
    console.log(this.posts);
    this.wp.getPosts(query)
    .subscribe(posts => {
      this.posts = posts;
      loader.dismiss();
    }, (error) => {
      loader.dismiss();
    });
    
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
  
/*  openSettings() {
    this.nav.push(SettingsPage);
  }
  */
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




}
