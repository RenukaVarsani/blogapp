import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { data } from './data.model';
import { NgToastService  } from 'ng-angular-popup';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css'],
})
export class BloglistComponent implements OnInit{

  blogData: any;
  id: any;
  row:any;
  userData: any;

  dataObj: data = new data();
  details: FormGroup;



  constructor(
    private service: UsersService,
    public authService:AuthService,
    private route:ActivatedRoute,
    private toast:NgToastService,
    private fb: FormBuilder) {


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
   this.toast.warning({detail:"delete blog ",duration:5000})
    });}


  onEdit(i: any) {
    this.details.controls['name'].setValue(i.name);
    this.details.controls['description'].setValue(i.description);
  }


  updateData(id:any){
    this.dataObj.name = this.details.value.name;
    console.log(id);
    this.dataObj.description = this.details.value.description;
    this.service.updateBlogData(this.dataObj,id._id)
    .subscribe(res=>{console.log(res);
      this.toast.info({detail:"update blog ",duration:5000})

    })

  }


}
