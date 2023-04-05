import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {data} from '../showuser/data.model'
import { NgToastService  } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.css']
})

export class ShowuserComponent  {


  UserData: any;
  userDetails: any;
  dataObj: data = new data();
  i: any;
  userId: any;

constructor(private userservice:UsersService,
            private fb:FormBuilder,
            private Toast:ToastrService
            ){

    this.userservice.getUserData().subscribe((UserData: any) => {
    this.UserData = UserData;
  });


  this.userDetails=this.fb.group({

    name : [''],
    email : [''],
    password : ['']

  })}

    ngOnInit(): void {
  }

  deleteData(i: any) {
    this.userservice.deleteUserData(i._id).subscribe((res) => {
      this.Toast.error('','Your data is deleted!' ,{
        timeOut: 1000,
      });
    })}


  onEdit(i: any) {
    this.userDetails.controls['name'].setValue(i.username);
    this.userDetails.controls['email'].setValue(i.email);
    this.userId = i._id
  }


  updateData(){
    this.dataObj.username = this.userDetails.value.name;
     this.dataObj.email = this.userDetails.value.email;
     this.userservice.updateUserData(this.dataObj, this.userId).subscribe();
     this.Toast.info('','Your data is Updated!' ,{
      timeOut: 1000,
    });
}}


