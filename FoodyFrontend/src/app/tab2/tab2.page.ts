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
  public rstListFiltered = [];

  constructor(public rstService: RestaurantService, private router: Router) {
    this.rstService.getRestaurants().subscribe(items => {
      this.rstList = items;
      this.rstListFiltered = items;
    });
  }

  goToPage(id) {
    this.router.navigate(['/tabs/rst-menu/' + id]);
  }

  filter(searchStr) {
    if (searchStr) {
      this.rstListFiltered = [];
      this.rstList.forEach(rst => {
        if ((rst.name && rst.name.includes(searchStr)) ||
            (rst.description && rst.description.includes(searchStr))) {
          this.rstListFiltered.push(rst);
        }
      });
    }
  }

}
