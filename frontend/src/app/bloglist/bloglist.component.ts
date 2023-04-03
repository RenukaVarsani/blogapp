import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
// import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { data } from './data.model';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css'],
})
export class BloglistComponent {

  blogData: any;
  i: any;
  userData: any;

  dataObj: data = new data();
  details: FormGroup;


  constructor(
    private service: UsersService,
    private storageservice: StorageService,
    private authservice:AuthService,
    private fb: FormBuilder) {
    this.service.getBlogData().subscribe((blogData: any) => {
      this.blogData = blogData;
      console.log(blogData);

    });

    this.details = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  isLogin= this.authservice.isLogin();

  isAdmin = this.authservice.isAdmin();


  deleteData(i: any) {
    this.service.deleteBlogData(i.id).subscribe((res) => {
      alert('deleted');
    });}


  onEdit(i: any) {
    this.details.controls['name'].setValue(i.name);
    this.details.controls['description'].setValue(i.description);
  }


  updateData(){
    this.dataObj.name = this.details.value.name;
    this.dataObj.description = this.details.value.description;
    this.service.updateBlogData(this.dataObj,this.dataObj.id)
    .subscribe(res=>{console.log(res);
      alert("update");

    })

  }


}
