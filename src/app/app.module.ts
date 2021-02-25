import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginRecordsService } from './login-records.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule
} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [LoginRecordsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
