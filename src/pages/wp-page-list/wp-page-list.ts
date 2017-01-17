import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {WpProvider} from '../../providers/wp-provider';
import {UtilProvider} from '../../providers/util-provider';
import {WpPage} from '../wp-page/wp-page';

@Component({
    templateUrl: 'wp-page-list.html'
})
export class WpPageList {
    pages:Array<any>;
    constructor(public alertCtrl:AlertController, public nav:NavController, public wp: WpProvider, public up: UtilProvider) {
        let loader = this.up.getLoader('Loading Pages ...');
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
}