import { Component, OnInit } from '@angular/core';
import {data} from '../addblog/data.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/services/users.service';
import { Router } from '@angular/router';
import { NgToastService  } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit{
  file :any
  addBlog!: FormGroup;
  dataObj: data = new data();
  imageData!: string;
  selectedFile: any;
  BLOG = "http://localhost:8080/blogs/"
  imageUrl: string = "";

  constructor(private userservice:UsersService,
    private router:Router,
     private fb:FormBuilder,
     private Toast:ToastrService,
     private http:HttpClient
     ){}

  ngOnInit(){
  this.addBlog = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    image: ['']
  });
  }

onFileSelect(event :any) {

  const file = event.target.files[0];
   this.addBlog.patchValue({ image: file });
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (file && allowedMimeTypes.includes(file.type)) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageData = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  
}

  postBlog(){
        this.dataObj.name=this.addBlog.value.name;
      this.dataObj.description=this.addBlog.value.description;
      console.log(this.addBlog.value.image.name);
      
      this.userservice.postBlogData(this.dataObj, this.addBlog.value.image )
      .subscribe({
        next:((res)=>{
          console.log(res)
          this.Toast.info('','Your data is updated' ,{
            timeOut: 1000,
          });
          this.addBlog.reset();
        })
      })

        }



}
