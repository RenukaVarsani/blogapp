import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddblogComponent } from './addblog/addblog.component';
import { AuthguardGuard } from './auth/authguard.guard';
import { BloglistComponent } from './bloglist/bloglist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowuserComponent } from './showuser/showuser.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },


  { path: 'userlist', component: ShowuserComponent },

  { path: 'register', component: RegisterComponent },

  { path: "home", component: BloglistComponent },

  { path: "add", component: AddblogComponent    } ,

  // { path: "login/resetpassword", component: ResetpasswordComponent},

  // {path: 'response-reset-password/:token', component: ResponseresetpasswordComponent},

  {path: '**',component:BloglistComponent }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
