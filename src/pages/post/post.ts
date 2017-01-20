import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HtmlPipe} from '../../pipes/html-pipe';

@Component({ 
  templateUrl: 'post.html' 
})
export class PostPage {
  
  postData:any;
  constructor(public nav:NavController, public params: NavParams) {
    this.postData = this.params.get('postData');  
    console.log(this.postData);
  }
}
