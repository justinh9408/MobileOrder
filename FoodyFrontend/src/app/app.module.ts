import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { OrderModalPage } from './order-modal/order-modal.page';
import { OrderModalPageModule } from './order-modal/order-modal.module';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [OrderModalPage],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,
            OrderModalPageModule,
           IonicStorageModule.forRoot(),
           SocketIoModule.forRoot(config)
          ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
