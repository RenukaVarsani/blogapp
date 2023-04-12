import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { data } from './data.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  dataObj: data = new data();
  login: FormGroup;
  isLogin: any;
  isAdmin: any;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder,
  ) {
    this.login = this.fb.group({
      password: [''],
      email: [''],
    });
  }

  onSubmit() {
    this.authService.login(this.login?.value.email, this.login?.value.password); }

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin1;
    this.isAdmin = this.authService.isAdmin1;
  }
}
