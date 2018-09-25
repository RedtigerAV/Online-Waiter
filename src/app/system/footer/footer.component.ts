import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { PageTypes } from './pageTypes.enum';

@Component({
  selector: 'footer',
  templateUrl: './footer.template.html',
  styleUrls: ['./footer.style.less']
})
export class FooterComponent {
  @Input() selectType = PageTypes.MENU;
  @Output() changePageType = new EventEmitter<PageTypes>();

  constructor(private userService: UserService) {
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  changeType(type: PageTypes) {
    this.selectType = type;
    this.changePageType.emit(type);
  }
}
