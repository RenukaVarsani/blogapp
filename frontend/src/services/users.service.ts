import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { data } from 'src/app/bloglist/data.model';

const BLOG = "http://localhost:8080/blogs/"
const USER = "http://localhost:8080/users/"



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

/* user http method */

  getUserData(): Observable<any> {
    return this.http.get(USER+'getdata');

  }

  getUser(): Observable<any> {
    return this.http.get(USER + 'me', { responseType: 'text' });
  }

  updateUserData(data:any,id:number){
    return this.http.put<any>(USER+ id,data)
      .pipe(map((res:any)=>{return res;}))
  }

  deleteUserData(id:number){
  return this.http.delete<any>(USER+id)
    .pipe(map((res:any)=>{return res;}))

}

postUserData(data:any){
  return this.http.post<any>(USER,data)
  .pipe(map((res:any)=>{return res;}))

}
/* blog http method */


getBlogData(): Observable<any>{
  return this.http.get<any>(BLOG+'myblogs' ,  { headers: new HttpHeaders({  'Access-Control-Allow-Origin':'*',})})
    .pipe(map((res:any)=>{return res;}))

}


postBlogData(data:any){
  return this.http.post<any>(BLOG,data)
  .pipe(map((res:any)=>{return res;}))

}

getBlogDataById(id:number){
  return this.http.get<any>(BLOG)
    .pipe(map((res:any)=>{return res;}))

}

updateBlogData(data:any,id:number){
  return this.http.put<any>(BLOG + id,data)
    .pipe(map((res:any)=>{return res;}))
}

deleteBlogData(id:number){
  return this.http.delete<any>(BLOG+id)
    .pipe(map((res:any)=>{return res;}))

}}





