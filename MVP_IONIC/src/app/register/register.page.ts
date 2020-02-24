import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { RestaurantService } from '../service/restaurant.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;

  constructor(public rstService:RestaurantService, public userService: UserService) { }

  ngOnInit() {
  }

  passwordCheck() {
    if (this.password === this.confirm) {
      return true;
    } else {
      return false;
    }
  }

  register() {
    const item = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    this.rstService.register(item).subscribe(result => {
      console.log('success!', result);
      window.location.href = '/admins/home?rstid=2';
    });
  }


}
