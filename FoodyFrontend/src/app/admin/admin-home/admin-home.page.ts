import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../service/restaurant.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

	// tslint:disable:indent
	restaurant = {
		id: -1,
		name: '',
		description: '',
		imagePath: ''
	};

	image: any;

	constructor(public toastController: ToastController,
				public restaurantService: RestaurantService, public storage: Storage) {
		storage.get('rstId').then(result => {
			// tslint:disable-next-line:radix
			restaurantService.getRestaurant(parseInt(result)).subscribe(rst => {
				this.restaurant = rst[0];
			});

		});
	}


	ngOnInit() {
	}

	upload(event) {
		this.image = event.target.files[0];
	}

	uploadFile(name, id) {
		if (this.image) {
			const formData = new FormData();
			formData.append(name, this.image);
			this.restaurantService.uploadFile(formData, id).subscribe(result => {
				console.log(result);
				window.location.href = '/admins/home/';
			});
		} else {
			window.location.href = '/admins/home/';
		}
	}

	save() {
		if (this.restaurant.name) {
			this.restaurantService.updateRestaurant(this.restaurant.id, this.restaurant).subscribe(result => {
				this.uploadFile('rstImage', result[0].id);
				this.presentToast('Restaurant Info Saved!');
			});
		} else {
			this.presentToast('Restaurant name is required!');
		}
	}
	async presentToast(mes) {
		const toast = await this.toastController.create({
		  message: mes,
		  duration: 2000
		});
		toast.present();
	  }
}
