import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { RestaurantService } from '../service/restaurant.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  name: string;
  password: string;

  valid = true;

  constructor(public rstService:RestaurantService,private router: Router) { }

  ngOnInit() {
  }

  login() {
    const item = {
      name: this.name,
      password: this.password
    };
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
