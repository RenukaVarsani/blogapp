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

  constructor(

    private authService: AuthService,
    private userService:UsersService )

    {

    this.userService.getBlogData().subscribe((blogData: any) => {
      this.blogData = blogData; });

    const isLogin= this.authService.isLogin();
    const isAdmin = this.authService.isAdmin();


   function logout(this: any){
      this.authService.logout();
    }

  }
}



