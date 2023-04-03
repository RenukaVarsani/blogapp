import { Component,inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'src/services/users.service';
import { AuthService } from './../../services/auth.service';
import {data} from '../register/data.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  dataObj: data = new data();
  signUp: FormGroup;

  constructor(private userservice:UsersService,private router:Router,private fb:FormBuilder,private authservice:AuthService){

    this.signUp=this.fb.group({

      username : [''],
      role : [''],
      password : [''],
      email : [''],
    })}
    ngOnInit(): void {
      debugger
      console.log('check');

    }

    submit(){
      debugger;
      console.log('submit : ');
        // this.dataObj.username=this.signUp.value.username;
        // this.dataObj.role=this.signUp.value.role;
        // this.dataObj.password=this.signUp.value.password;
        // this.dataObj.email=this.signUp.value.email;
        this.authservice.register( this.signUp.value.username,this.signUp.value.email,this.signUp.value.password,this.signUp.value.role)

         }

}
