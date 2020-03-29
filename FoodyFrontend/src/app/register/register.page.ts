import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute } from '@angular/router';
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
  isRst:string;

  constructor(public rstService:RestaurantService, public userService: UserService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.isRst = this.route.snapshot.paramMap.get('isRst');
  }

  passwordCheck() {
    if (this.password === this.confirm) {
      return true;
    } else {
      return false;
    }
  }

  register() {
    if(this.isRst = '0'){
    const item = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    this.userService.register(item).subscribe(result => {
      console.log('success!', result);
      window.location.href = '/admins/home?rstid=2';
    });
    }
    else if(this.isRst = '1'){
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


}
