import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {HtmlPipe} from '../../pipes/html-pipe';
@Component({
    templateUrl: 'wp-page.html'
})
export class WpPage {
    page:any;
    constructor(public params:NavParams) {
        this.page = this.params.get('page');
    }
}   