import { Component, OnInit, Output } from '@angular/core';
import { RestaurantService } from '../service/restaurant.service';
import { MenuService } from '../service/menu.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-rst-menu',
  templateUrl: './rst-menu.page.html',
  styleUrls: ['./rst-menu.page.scss'],
})
export class RstMenuPage implements OnInit {

  restaurant = {
    id: -1,
    name: '',
    email: '',
    password: '',
    description: '',
    imagePath: ''
  };
  categories = null;

  @Output() categoryInShow: any;
  @Output() rstId: number;
  
  constructor(public menuService: MenuService, public rstService: RestaurantService,
              private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      // tslint:disable-next-line:radix
      this.rstId =  parseInt(params.get('rstId'));
      rstService.getRestaurant(this.rstId).subscribe(rst => {
        if (rst && rst.length > 0) {
          this.restaurant = rst[0];
          console.log(this.restaurant);
        }
      });
      menuService.getCategories(this.rstId).subscribe(cats => {
        this.categories = cats;
        this.categories.forEach((cat,index) => {
          cat.items = [];
          if (index === 0) {
            cat.selectedColor = 'secondary';
          } else {
            cat.selectedColor = 'tertiary';
          }
        });
        this.categoryInShow = this.categories[0];
        menuService.getCategoriesWithItem(this.rstId).subscribe(items => {
          items.forEach(item => {
            const category = this.categories.find(cat => item.catID === cat.id);
            if (category) {
              category.items.push(item);
            }
          });
        });
      });
    });
  }

  ngOnInit() {
  }

  categoryClick(category) {
    this.categories.forEach(cat => {
      cat.selectedColor = 'tertiary';
    });
    category.selectedColor = 'secondary';
    this.categoryInShow = category;
  }

}
