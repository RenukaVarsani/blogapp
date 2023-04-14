import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

const AUTH_API = 'http://localhost:8080/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})

export class AuthService  {

  user: any
  token: any;
  refreshToken:any
  roles: any;
  isUser: boolean = false;
  isAdmin1: boolean = false;
  isLogin1 : boolean = false;
  isWriter1 : boolean=false;
  isLoading:boolean = false;

  constructor(private http: HttpClient, private router: Router,  private Toast:ToastrService) {}

  getUser() {
    return this.user;
  }

  isAdmin() {
    this.user = localStorage.getItem('user');
    if (JSON.parse(this.user).role === 'admin') {
      this.isAdmin1 = true;
      this.isLogin1 = true;
      this.isWriter1 =false;

    }
    else if(JSON.parse(this.user).role === 'user'){
      this.isAdmin1 = false;
      this.isLogin1 = true;
      this.isWriter1 =false;

    }
    else if(JSON.parse(this.user).role === 'writer'){
      this.isAdmin1 = false;
      this.isLogin1 = true;
      this.isWriter1 =true;

    }
    else{
      console.log("Incorret Details");
      this.isAdmin1 = false;
      this.isLogin1 = false;
      this.isWriter1 =false;
    }
  }

  getToken() {
    return this.token;
  }

  getAccessToken(){

      const refreshToken = localStorage.getItem('refreshToken')
      const data = {  refreshToken }

    return this.http.post(AUTH_API + '/token' , data)

  }

  //FOR USER LOGIN
  login(email: string, password: string) {
    return this.http
      .post<{
        refreshToken: any; token: string; user: string;
}>(AUTH_API + '/login', {
        email,
        password,
      })
      .subscribe(
        (response) => {
          const token = response.token;
          const refreshToken = response.refreshToken
          this.refreshToken = refreshToken;
          this.token = token;
          if (token) {
            this.user = response.user;
            this.saveAuthData(token, this.user , refreshToken);
            this.isAdmin()
            this.Toast.info('','You are login!' ,{
              timeOut: 1000,
            });
            this.isLoading = true;
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }

  //FOR USER SIGNUP
  register(username: string, email: string, password: string, role: string) {
    console.log('data : ', username, email, password);

    return this.http
      .post(AUTH_API + '/signup', {
        username,
        email,
        password,
        role,
      })
      .subscribe(
        () => {
          this.Toast.info('','You are Registered!' ,{
            timeOut: 1000,
          });
          this.isLoading = true;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }

  //fOR USER LOGOUT

  logout() {
    this.token = null;
    this.refreshToken = null;
    this.isLogin1 = false;
    this.user = null;
    this.clearAuthData();

    this.Toast.error('','You are LoggedOut!' ,{
      timeOut: 1000,
    });
    this.router.navigate(['/']);
  }

  public saveToken(token: string) {
    localStorage.setItem('token' , token)

  }

  private saveAuthData(token: string, user: string , refreshToken:any) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearAuthData() {
      localStorage.clear()
  }

}
