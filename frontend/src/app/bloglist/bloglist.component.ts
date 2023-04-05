import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { data } from './data.model';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css'],
})
export class BloglistComponent implements OnInit{

  blogData: any;
  blogId: any;
  id :any
  row:any;
  userData: any;

  dataObj: data = new data();
  details: FormGroup;



  constructor(
    private service: UsersService,
    public authService:AuthService,
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private Toast:ToastrService) {


      this.id = this.route.snapshot.paramMap.get('_id');
      console.log(this.id);

      this.service.getBlogData().subscribe((blogData: any) => {
      this.blogData = blogData;
      console.log(blogData);

    });

    this.details = this.fb.group({
      name: [''],
      description: [''],
    });

  }
  ngOnInit() {
    this.authService.isAdmin()
    console.log("Triggering");

  }

  isLogin= this.authService.isLogin1;



  deleteData(id: any) {
    this.service.deleteBlogData(id).subscribe((res) => {
      this.Toast.error('','Data is deleted' ,{
        timeOut: 1000,
      });



    });}


  onEdit(i: any) {
    this.details.controls['name'].setValue(i.name);
    this.details.controls['description'].setValue(i.description);
    this.blogId = i._id
  }



  updateData(){
    console.log(this.blogId);

    this.dataObj.name = this.details.value.name;
    // console.log(id);
    this.dataObj.description = this.details.value.description;
    this.service.updateBlogData(this.dataObj,this.blogId).subscribe()
    this.Toast.info('','Your data is updated' ,{
      timeOut: 1000,
    });


  }


}
