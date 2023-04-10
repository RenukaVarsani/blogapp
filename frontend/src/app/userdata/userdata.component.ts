import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})


export class UserdataComponent {

  id!:any;
  data: any;



  constructor(private service:UsersService,private router:ActivatedRoute){

  this.id = this.router.snapshot.paramMap.get('id');

  this.service.getUserDataById(this.id).subscribe((data)=>{this.data=data})
}}
