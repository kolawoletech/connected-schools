import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { PostCmp } from '../../components/post/post';
import { PostsPage } from '../posts/posts';
import { WpProvider } from '../../providers/wp-provider';
import { UtilProvider } from '../../providers/utils';
import { WpPage } from '../wp-page/wp-page';
import {KeysPipe} from '../../pipes/nested-json';
import {ValuesPipe} from '../../pipes/values-pipe';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  events:any;
  //storage = new Storage();

  query:{};
  list:Array<any>;
  calendar:any;
  constructor(public nav:NavController, public wp:WpProvider, public up:UtilProvider,public alertCtrl:AlertController) {

        
      this.wp.getEvents2().subscribe(
          (data) => {
            this.events = data
            console.log('item: ', this.events)
            console.log('locations: ', this.events.events)
            this.calendar = this.events.events;
          },
          (err) =>  console.log("Error Loging In: ",err),
          () => { console.log("All Good With The Data")  }
        );
    }
  
    getData () {
      return this.wp.getEvents2()
        .map(res =>  res.json().item)
  }

/*    let loader = this.up.getLoader("Loading Categories");
    this.alertCtrl.create(loader);
    this.wp.getEvents2()
    .map(events => {
      this.events = events.json().events ;
      console.log(this.events);
      loader.dismiss();
    }, ()=> {
      loader.dismiss();
    })*/

  }


