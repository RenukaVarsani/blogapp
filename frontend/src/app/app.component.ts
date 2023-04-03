import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  blogData: string | undefined;
  isLogin?: any;
  isAdmin?: any;


  constructor(
    public authService: AuthService,
    private userService: UsersService)

     {
    this.userService.getBlogData().subscribe((blogData: any) => {
      this.blogData = blogData;
    });
  }


  ngOnInit(): void {
    this.isLogin = this.authService.isLogin1;
    this.isAdmin = this.authService.isAdmin1;
    // console.log('variable : ',this.isAdmin,this.isLogin);
  }


  logout(this: any) {
    this.authService.logout();
  }
}
