import { Component } from '@angular/core';
import {data} from '../bloglist/data.model'
import {  FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UsersService } from 'src/services/users.service';
import { Router } from 'express';
@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent {

  dataObj: data = new data();
  addBlog: FormGroup;

  constructor(private userservice:UsersService,private router:Router,private fb:FormBuilder){

    this.addBlog=this.fb.group({

      name : [''],
      description : ['']

    })}

    postBlog(){
        this.dataObj.name=this.addBlog.value.name;
        this.dataObj.description=this.addBlog.value.description;
        this.userservice.postBlogData(this.dataObj)
        .subscribe(res=>{console.log(res);
          alert("added");
          this.addBlog.reset();
        })
         }

}


