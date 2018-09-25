import { Component } from '@angular/core';
import { PageTypes } from './footer/pageTypes.enum';

@Component({
  selector: 'system',
  templateUrl: './system.template.html',
  styleUrls: ['./system.style.less']
})
export class SystemComponent {
  pageType = PageTypes.MENU;

  onChangePageType(type: PageTypes) {
    this.pageType = type;
  }
}
