import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

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
  roles: any;
  isUser: boolean = false;
  isAdmin1: boolean = false;
  isLogin1 : boolean = false

  constructor(private http: HttpClient, private router: Router) {}
  getUser() {
    return this.user;
  }

  isAdmin() {
    this.user = localStorage.getItem('user');
    // console.log(JSON.parse(this.user).role);
    if (JSON.parse(this.user).role === 'admin') {
      this.isAdmin1 = true
      this.isLogin1 = true
    }
    else if(JSON.parse(this.user).role === 'user'){
      this.isAdmin1 = false
      this.isLogin1 = true
    }
    else{
      console.log("Incorret Details");
      this.isAdmin1 = false
      this.isLogin1 = false
    }

  }

  getToken() {
    return this.token;
  }

  //FOR USER LOGIN
  login(email: string, password: string) {
    return this.http
      .post<{ token: string; user: string }>(AUTH_API + '/login', {
        email,
        password,
      })
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {

            this.user = response.user;
            this.saveAuthData(token, this.user);
            this.isAdmin()
            this.router.navigate(['/home']);
          }
        },
        (error) => {
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
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //fOR USER LOGOUT

  logout() {
    this.token = null;
    this.isLogin1 = false;
    this.user = null;
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
