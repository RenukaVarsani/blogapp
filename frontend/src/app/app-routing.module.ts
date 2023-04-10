import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddblogComponent } from './addblog/addblog.component';
import { AuthguardGuard } from './auth/authguard.guard';
import { BlogdataComponent } from './blogdata/blogdata.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { ShowuserComponent } from './showuser/showuser.component';
import { UserdataComponent } from './userdata/userdata.component';

const routes: Routes = [


  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent  },

  { path: 'userlist', component: ShowuserComponent , canActivate:[AuthguardGuard]},

  { path: 'register', component: RegisterComponent },

  { path: "home", component: BloglistComponent },

  { path: "add", component: AddblogComponent , canActivate:[AuthguardGuard]   } ,

  { path: "select/:id", component: BlogdataComponent  } ,

  { path: "selected/:id", component: UserdataComponent  } ,

  { path: "resetpassword", component: RequestResetComponent},

  {path: 'resetpassword/:token', component: ResponseResetComponent},

  {path: '**',component:LoginComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
