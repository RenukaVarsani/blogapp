import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {data} from '../showuser/data.model'
import { NgToastService  } from 'ng-angular-popup';


@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.css']
})

export class ShowuserComponent {


  UserData: any;
  userDetails: any;
  dataObj: data = new data();
  i: any;

constructor(private userservice:UsersService,
            private fb:FormBuilder,
            private toast:NgToastService
            ){

  this.userservice.getUserData().subscribe((UserData: any) => {
    this.UserData = UserData;
  });


  this.userDetails=this.fb.group({

    name : [''],
    email : [''],
    password : ['']

  })}

  deleteData(i: any) {
    this.userservice.deleteUserData(i._id).subscribe((res) => {
      this.toast.warning({detail:"delete user",duration:5000})
    });}


  onEdit(i: any) {
    this.userDetails.controls['name'].setValue(i.username);
    this.userDetails.controls['email'].setValue(i.email);
  }


  updateData(user:any){
    this.dataObj.username = this.userDetails.value.username;
    this.dataObj.email = this.userDetails.value.email;
    this.userservice.updateUserData(this.dataObj,user._id)
    .subscribe(res=>{console.log(res);
      this.toast.info({detail:"update user",duration:5000})

    })
}}

