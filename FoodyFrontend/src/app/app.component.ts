import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './service/user.service';
import { RestaurantService } from './service/restaurant.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  userName: string;
  rstName: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public userService: UserService,
    public restaurantService: RestaurantService,
    private storage: Storage
  ) {
    this.initializeApp();
    this.storage.get('rstName').then(result => {
      this.rstName = result;
    });
    this.storage.get('userName').then(result => {
      this.userName = result;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
