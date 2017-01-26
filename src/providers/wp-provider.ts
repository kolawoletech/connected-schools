import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {SITE_URL} from './constants';
import {EVENT_URL} from './constants';
import {TOKEN} from './constants';
import {ORGANISER_ID} from './constants';

@Injectable()
export class WpProvider {
  apiURL:string = SITE_URL + '/wp-json/wp/v2';
  briteURL:string = EVENT_URL + '/v3/events/search';
  tokenEventbrite: string = TOKEN;
  organiser_ID: string = ORGANISER_ID;
  constructor(public http:Http) {}

  //https://www.eventbriteapi.com/v3/events/search/?token=WTWO2HB5ZNG27DBFVQXC&organizer.id=4668622183&expand=venue
  //https://www.eventbriteapi.com/v3/events/search/token?=WTWO2HB5ZNG27DBFVQXC&organizer.id=4668622183&expand=venue

   getEvents() {
    
    let url = this.briteURL + `/?token=` + this.tokenEventbrite + '&organizer.id=' + this.organiser_ID + '&expand=venue';
    return this.http.get(url)
      .map(data => {
        let posts= data.json();
        posts.forEach(post=>{
        })

        return posts[1];

        }  
      );
           
  }

  getEvents2() {
    let url = this.briteURL + `/?token=` + this.tokenEventbrite + '&organizer.id=' + this.organiser_ID + '&expand=venue';
    return this.http.get(url).map(data => data.json());
  }

  getPosts(query) {
    query = this.transformRequest(query);
    let url = this.apiURL + `/posts?` + query + '&_embed';
    return this.http.get(url)
      .map(data => {
        let posts = data.json();
        posts.forEach(post => {
          if(post.featured_media) {
            post.featuredMedia = this.getMedia(post.featured_media);
          }
        });
        return posts;
      });
           
  }
   
  getIcon() {
    return this.http.get('data.json').map(data => data.json());      
  }
  getMedia(id:number) {
    return this.http.get(this.apiURL + `/media/${id}`).map(data => data.json());
  }
  
  getPages() {
    return this.http.get(this.apiURL + '/pages').map(data => data.json());
  }
  
  getCategories() {
    return this.http.get(this.apiURL + '/categories').map(data => data.json());
  }
  
  transformRequest(obj) {
    let p, str;
    str = [];
    for (p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  }

}

