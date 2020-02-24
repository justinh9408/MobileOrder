import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.page.html',
  styleUrls: ['./admin-menu.page.scss'],
})
export class AdminMenuPage implements OnInit {

  categories = null;

  rstId = -1;

  constructor(public menuService: MenuService, public toastController: ToastController,
              public alertController: AlertController, public storage: Storage) {
    storage.get('rstId').then(result => {
      // tslint:disable-next-line:radix
      this.rstId = parseInt(result);
      menuService.getCategories(this.rstId).subscribe(cats => {
        this.categories = cats;
        this.categories.forEach(cat => {
          cat.isHide = true;
          cat.editMode = false;
          cat.items = [];
        });
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

  async addCategoryPopup() {
    const alert = await this.alertController.create({
      header: 'Add a New Category',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Confirm Ok');
            const item = {
              rstID: this.rstId,
              name: data.name,
              description: data.description
            };
            this.addCategory(item);
          }
        }
      ]
    });

    await alert.present();
  }

  addCategory(item) {
    this.menuService.createCategories(item).subscribe(result => {
      const newItem = result[0];
      newItem.isHide = false;
      newItem.editMode = false;
      newItem.items = [];
      this.categories.push(newItem);
      this.presentToast('Category is added successfully!');
    });
  }

  updateCategory(item) {
    this.menuService.updateCategories(item.id, item).subscribe(result => {
      console.log(result);
      item.editMode = false;
      this.presentToast('Category is updated successfully!');
    });
  }

  deleteCategory(catId) {
    this.menuService.deleteCategories(catId).subscribe(result => {
      this.presentToast('Category is deleted successfully!');
      const index = this.categories.findIndex(cat => cat.id === catId);
      if (index >= 0) {
        this.categories.splice(index, 1);
      }
    });
  }

  async categoryDeleteAlert(catId) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this category?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: data => {
            this.deleteCategory(catId);
          }
        }
      ]
    });
    await alert.present();
  }

  menuItemAddEdit(catId, itemId) {
    window.location.href = '/admins/menuitem/' + catId + '/' + itemId;
  }

  menuItemDelete(itemId, category) {
    this.menuService.deleteMenuItem(itemId).subscribe(result => {
      this.presentToast('Item is deleted successfully!');
      const index = category.items.findIndex(item => item.id === itemId);
      if (index >= 0) {
        category.items.splice(index, 1);      }
    });
  }

  async itemDeleteAlert(itemId, category) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: data => {
            this.menuItemDelete(itemId, category);
          }
        }
      ]
    });
    await alert.present();
  }

  collapse(cat) {
    cat.isHide = !cat.isHide;
  }

  categoryEdit(cat) {
    cat.editMode = !cat.editMode;
  }

  async presentToast(mes) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 2000
    });
    toast.present();
  }

}
