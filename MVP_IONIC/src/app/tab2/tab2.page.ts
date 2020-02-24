import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { RestaurantService } from '../service/restaurant.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public rstList = [];
  constructor(public rstService: RestaurantService, private router: Router) {
    this.rstService.getRestaurants().subscribe(items => {
      this.rstList = items;
    });
  }

  goToPage(id) {
    this.router.navigate(['/tabs/rst-menu/' + id]);
  }



}
