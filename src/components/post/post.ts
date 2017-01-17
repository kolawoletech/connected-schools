import { Component,  Input,Output, EventEmitter, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {GoogleAnalytics} from 'ionic-native';
import {HtmlPipe} from '../../pipes/html-pipe';
import {WpProvider} from '../../providers/wp-provider';
import {SocialSharing} from 'ionic-native';

/*
  Generated class for the Post component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'post',
  templateUrl:'post.html',
})
export class PostCmp {
    @Input() postData;
    @Output() read = new EventEmitter();
    @Output() favorite = new EventEmitter();
    
    featuredMedia = {};
    authorData = {};
    comments = [];
    favoriteList = [];
    constructor(public wp:WpProvider) {
    }
    
    ngOnInit() {
      this.authorData = this.postData["_embedded"].author[0];
      this.postData.featuredMedia = this.postData.featuredMedia || false;
      if(this.postData.featuredMedia) {
         this.postData.featuredMedia.subscribe(data => {
          this.featuredMedia = data;
         }); 
      }
      
      if(this.postData["_embedded"].replies) {
          this.comments = this.postData["_embedded"].replies[0];
      }         
    }
    
    readBtn() {
       GoogleAnalytics.trackView(this.postData.link);
       this.read.emit({post: this.postData, author: this.authorData, media: this.featuredMedia, comments: this.comments});
    }
    
    favoriteBtn() {
        this.favorite.emit({post: this.postData, author: this.authorData, media: this.featuredMedia, comments: this.comments});
    }
    
    shareBtn() {
        let title = this.postData.title.rendered;
        let author = this.authorData['name'];
        let message = `Read this post on ${title} by ${author}.`;
        let url = this.postData.link;
        
        SocialSharing.share(message,"Read this post", null, url);
    }
    
    

}
