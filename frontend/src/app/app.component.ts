import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { NgToastService  } from 'ng-angular-popup';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {


  title(title: any) {
    throw new Error('Method not implemented.');
  }

  blogData: string | undefined;
  isLogin?: any;
  isAdmin?: any;
  pagesize!:any;
  currentsize!:any;


  constructor(
    public authService: AuthService,
    private userService: UsersService,
    private toast:NgToastService){

    // this.userService.getBlogData(this.pagesize,this.currentsize).subscribe((blogData: any) => {
    //   this.blogData = blogData;
    // });
  }


  ngOnInit(): void {
    this.authService.isAdmin()
    console.log(this.authService.isLogin1);

  }


  logout(this: any) {
    this.authService.logout();
    this.toast.warning({detail:"logout",duration:5000})
  }
}
