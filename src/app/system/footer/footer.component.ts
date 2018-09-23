import { Component } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.template.html',
  styleUrls: ['./footer.style.less']
})
export class FooterComponent {
  constructor(private userService: UserService) {
  }

  isAdmin() {
    return this.userService.isAdmin();
  }
}
