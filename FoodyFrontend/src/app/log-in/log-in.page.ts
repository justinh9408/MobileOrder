import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { RestaurantService } from '../service/restaurant.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  name: string;
  password: string;
  isRst: string;
  valid = true;

  constructor(public rstService: RestaurantService,
              public userService: UserService, private router: Router,
              private route: ActivatedRoute) {
                this.isRst = this.route.snapshot.paramMap.get('isRst');
              }

  ngOnInit() {
  }

  login() {
    const item = {
      name: this.name,
      password: this.password
    };
    if (this.isRst === '0') {
      // user
      this.userService.login(item).subscribe(result => {
        console.log(result);
        if (result.length > 0) {
          this.valid = true;
          this.userService.setLoginStorage(result[0]);
        } else {
          this.valid = false;
        }
      });
    } else if (this.isRst === '1') {
      // rst
      this.rstService.login(item).subscribe(result => {
        console.log(result);
        if (result.length > 0) {
          this.valid = true;
          this.rstService.setLoginStorage(result[0]);
        } else {
          this.valid = false;
        }
      });
    }
  }

}
