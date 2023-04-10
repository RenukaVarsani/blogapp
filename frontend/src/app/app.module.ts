import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ShowuserComponent } from './showuser/showuser.component';
import { AddblogComponent } from './addblog/addblog.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogdataComponent } from './blogdata/blogdata.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { UserdataComponent } from './userdata/userdata.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ShowuserComponent,
    AddblogComponent,
    BloglistComponent,
    BlogdataComponent,
    RequestResetComponent,
    ResponseResetComponent,
    UserdataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    NgxPaginationModule
  ],
  
  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
