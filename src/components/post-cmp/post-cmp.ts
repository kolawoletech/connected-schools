import { Directive } from '@angular/core';

/*
  Generated class for the PostCmp directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[post-cmp]' // Attribute selector
})
export class PostCmp {

  constructor() {
    console.log('Hello PostCmp Directive');
  }

}
