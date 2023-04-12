import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { data } from './data.model';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css'],
})
export class BloglistComponent implements OnInit {
  blogData: any = [];
  blogId: any;
  id: any;
  row: any;
  userData: any;
  dataObj: data = new data();
  details: FormGroup;
  totalBlog = 0;
  blogsPerPage = 2;
  currentpage = 1;
  itemList = null;
  displayIteam: string[] = [];
  data: any;
  imageData!: string;
  blog: any = [];
  errMessage: any;

  constructor(
    private service: UsersService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private Toast: ToastrService
  ) {


    this.service
      .getBlogData(this.blogsPerPage, this.currentpage)
      .subscribe((blogData: any) => {
        this.blogData = blogData;
      }
      );

    this.details = this.fb.group({
      name: [''],
      description: [''],
      image: ['']
    });
  }
  ngOnInit() {
    this.authService.isAdmin();
  }

  isLogin = this.authService.isLogin1;

  onChangedPage(pageData: PageEvent) {
    this.currentpage = pageData.pageIndex + 1;
    this.blogsPerPage = pageData.pageSize;
    this.service
      .getBlogData(this.blogsPerPage, this.currentpage)
      .subscribe((res) => {
        this.blogData = res;
        console.log(res);
      });
  }

  onFileSelect(event :any) {

    const file = event.target.files[0];
     this.details.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteData(id: any) {
    this.service.deleteBlogData(id).subscribe((res) => {
      this.Toast.error('', 'Data is deleted', {
        timeOut: 1000,
      });
    });
    this.service
    .getBlogData(this.blogsPerPage, this.currentpage)
    .subscribe((blogData: any) => {
      this.blogData = blogData;
    });
  }

  onEdit(i: any) {
    this.details.controls['name'].setValue(i.name);
    this.details.controls['description'].setValue(i.description);
    this.blogId = i._id;
    this.blog = this.blogData.filter((elem: any) => elem._id == this.blogId)[0].image;
    console.log(this.blog);
  }

  updateData() {
    this.dataObj.name = this.details.value.name;
    this.dataObj.description = this.details.value.description;
    console.log(this.details.value.image);

    this.service
      .updateBlogData(this.dataObj, this.blogId, this.details.value.image)
      .subscribe();
    this.Toast.info('', 'Your data is updated', {
      timeOut: 1000,
    });

    this.router.navigate(['/']);


  }


}
