import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: any = {
    email: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.authService.isLogin1) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }}


  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password)
  }

  reloadPage(): void {
    window.location.reload();
  }




}
