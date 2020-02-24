import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../service/restaurant.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.page.html',
  styleUrls: ['./admins.page.scss'],
})
export class AdminsPage implements OnInit {

  constructor(private restaurantService: RestaurantService) {
    restaurantService.checkLoginStatus();
   }

  ngOnInit() {
  }

}
