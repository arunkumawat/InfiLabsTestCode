import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeviceAdminComponent } from './components/device-admin.component';
import { routing } from './route.module';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    DeviceAdminComponent
  ],
  imports: [
    BrowserModule, routing, FormsModule,
    NgxPaginationModule, ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
