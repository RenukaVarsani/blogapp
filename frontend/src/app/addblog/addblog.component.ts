import { Component, OnInit } from '@angular/core';
import {data} from '../bloglist/data.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/services/users.service';
import { Router } from '@angular/router';
import { NgToastService  } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit{

  addBlog!: FormGroup;
  dataObj: data = new data();

  constructor(private userservice:UsersService,
    private router:Router,
     private fb:FormBuilder,
     private Toast:ToastrService){}

  ngOnInit(){
  this.addBlog = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });
}


  postBlog(){
      this.dataObj.name=this.addBlog.value.name;
      this.dataObj.description=this.addBlog.value.description;
      this.userservice.postBlogData(this.dataObj)
      .subscribe(res=>{console.log(res);
        this.Toast.info('','Your data is updated' ,{
          timeOut: 1000,
        });
        this.addBlog.reset();
      })
        }

}


