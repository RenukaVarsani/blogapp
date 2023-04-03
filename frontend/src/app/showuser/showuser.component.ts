import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {data} from '../showuser/data.model'
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

constructor(private userservice:UsersService,private fb:FormBuilder){

  this.userservice.getUserData().subscribe((UserData: any) => {
    this.UserData = UserData;
  });


  this.userDetails=this.fb.group({

    username : [''],
    email : [''],
    password : ['']

  })}

  deleteData(i: any) {
    this.userservice.deleteUserData(i.id).subscribe((res) => {
      alert('deleted');
    });}


  onEdit(i: any) {
    this.userDetails.controls['username'].setValue(this.i.name);
    this.userDetails.controls['email'].setValue(this.i.name);
    this.userDetails.controls['password'].setValue(this.i.password);
  }


  updateData(){
    this.dataObj.username = this.userDetails.value.username;
    this.dataObj.email = this.userDetails.value.email;
    this.dataObj.password = this.userDetails.value.password;
    this.userservice.updateUserData(this.dataObj,this.dataObj.id)
    .subscribe(res=>{console.log(res);
      alert("update");

    })






}


}

