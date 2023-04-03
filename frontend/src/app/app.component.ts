import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  blogData:string | undefined
  isLogin? :any
  isAdmin?:any
  constructor(

    private authService: AuthService,
    private userService:UsersService )

    {

    this.userService.getBlogData().subscribe((blogData: any) => {
      this.blogData = blogData; });

      this.isLogin= this.authService.isLogin();
      this.isAdmin = this.authService.isAdmin();

    }

        logout(this: any){
          this.authService.logout();
        }
}



