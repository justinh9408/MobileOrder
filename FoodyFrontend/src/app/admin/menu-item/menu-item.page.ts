import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../service/menu.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss'],
})
export class MenuItemPage implements OnInit {

  catId = -1;
  itemId = -1;
  title = '';
  item = {
    id: -1,
    catID: -1,
    name: '',
    description: '',
    imagePath: '',
    price: 0
  };
  rstId = -1;
  categories = [];
  image: any;
  constructor(private route: ActivatedRoute, private router: Router,
              public menuService: MenuService, public toastController: ToastController,
              public storage: Storage) {
    this.route.paramMap.subscribe(params => {
      // tslint:disable-next-line: radix
      this.catId = parseInt(params.get('catId'));
      // tslint:disable-next-line:radix
      this.itemId = parseInt(params.get('itemId'));
      if (this.itemId < 0) {
        this.title = 'Add Menu Item';
        this.getCategories();
      } else {
        this.title = 'Edit Menu Item';
        menuService.getMenuItem(this.itemId).subscribe(result => {
          console.log('result', result);
          Object.assign(this.item, result[0]);
          this.item.catID = -1;
          this.getCategories();
        });
      }
    });
   }

  ngOnInit() {
  }

  getCategories() {
    this.storage.get('rstId').then(rst => {
      // tslint:disable-next-line:radix
      this.rstId = parseInt(rst);
      this.menuService.getCategories(this.rstId).subscribe(result => {
        console.log('categories', result);
        this.categories = result;
        this.item.catID = this.catId;
      });
    });

  }

  save() {
    if (this.item.price && this.item.catID && this.item.name) {
      if (this.itemId > 0) {
        // edit
        this.menuService.updateMenuItem(this.itemId, this.item).subscribe(result => {
          this.uploadFile('menuItemImage', result[0].id);
          this.saveSuccessToast(result);
        });
      } else {
        // add
        this.menuService.createMenuItem(this.item).subscribe(result => {
          this.uploadFile('menuItemImage', result[0].id);
          this.saveSuccessToast(result);
        });
      }
    } else {
      this.presentToast('Required fields need to be filled!', false);
    }
  }

  cancel() {
    window.location.href = '/admins/menu/';
  }

  saveSuccessToast(result) {
    console.log(result);
    if (result && result.length > 0) {
      this.presentToast('Saved Successfully!');
    }
  }

  async presentToast(mes, nav=true) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 2000
    });
    toast.present().then(() => {
      if (nav) {
        window.location.href = '/admins/menu/';
      }
    });
  }

  upload(event) {
    this.image = event.target.files[0];
  }

  uploadFile(name, id) {
    if (this.image) {
      const formData = new FormData();
      formData.append(name, this.image); 
      this.menuService.uploadFile(formData, id).subscribe(result => {
        console.log(result);
      });
    }
  }


}
