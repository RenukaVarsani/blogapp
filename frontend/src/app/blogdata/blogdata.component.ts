import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';
@Component({
  selector: 'app-blogdata',
  templateUrl: './blogdata.component.html',
  styleUrls: ['./blogdata.component.css']
})
export class BlogdataComponent implements OnInit {

  id!:any;
  data: any;

constructor(private service:UsersService,private route:ActivatedRoute){}

ngOnInit(): void {
  

  this.id = this.route.snapshot.paramMap.get('id'); 
this.service.getBlogDataById(this.id).subscribe((data)=>{
  this.data=data
})


}

 




}
