import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:8080/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  token: any;
  roles: any;
  isLogin1:boolean=false;
  isAdmin1:boolean=false;

  constructor(private http: HttpClient,private router:Router) { }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }

//FOR USER LOGIN
  login(email: string, password: string) {
    return this.http.post<{ token: string ,user: string }>(
      AUTH_API + '/login',
      { email, password } ,
    )
    .subscribe(
      response => {

        const token = response.token;
        this.token = token;
        if (token) {
          this.isLogin1 = true;
          this.user = response.user;

          this.saveAuthData(token, this.user);
          this.router.navigate(["/home"]);
        }
      },
      error => {
      console.log(error);

      }
    );

  }


//FOR USER SIGNUP
  register(username: string, email: string, password: string,role:string) {
    console.log('data : ',username,email,password);

    return this.http.post(
      AUTH_API + '/signup',
      {
        username,
        email,
        password,
        role
      }
    ).subscribe(()=>{
      this.router.navigate(["/"]);
    },
    error => {
     console.log(error);

    });
  }


//fOR USER LOGOUT

logout()
    {
      this.token = null;
      this.isLogin1 = false;
       this.user = null;
      this.clearAuthData();
      this.router.navigate(["/"]);
    }

  private saveAuthData(token: string, user: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userId");

    return {
      token: token,
      user: user
    };
  }

 isAdmin(){

    if (this.isLogin1) {
      const user = this.getUser();
      this.roles = user.role;


      if(this.roles.includes('admin')){
        return true
      }
      else{
        return false
      }
      // (this.roles.includes('admin')) ? return true : return false;

      return true;

     // this.username = user.username;
    }else{
      return false;
    }
  }


}



