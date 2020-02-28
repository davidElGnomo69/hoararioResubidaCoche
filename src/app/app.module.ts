import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatosServicesService } from './service/datos-services.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    SqliteDbCopy,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatosServicesService,
    SQLite
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
