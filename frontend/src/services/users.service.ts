import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { profile } from 'src/app/addblog/newData.model';
import { Router } from '@angular/router';

const BLOG = 'http://localhost:8080/blogs/';
const USER = 'http://localhost:8080/users/';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private profiles: profile[] = [];

  constructor(private http: HttpClient,private router:Router) {}

  /* user http method */

  requestReset(body:any): Observable<any> {
    return this.http.post(`${USER}req-reset-password`, body);
  }


  newPassword(body:any,token:any): Observable<any> {
    return this.http.post(`${USER}reset-password/${token}` , body);
  }


  ValidPasswordToken(token:any): Observable<any> {
    return this.http.get(`${USER}reset-password/${token}`);
  }


  getUserData(pagesize: number, currentpage: number): Observable<any> {
    return this.http
      .get<any>(
        USER + 'getdata' + `?pageSize=${pagesize}&currentPage=${currentpage}`,
        { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) }
      )
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  getUserDataById(id:number){
    return this.http.get<any>(USER + "selected/" + id)
      .pipe(map((res:any)=>{return res;}))}


  getUser(): Observable<any> {
    return this.http.get(USER + 'me', { responseType: 'text' });
  }

  updateUserData(data: any, id: number) {
    return this.http.patch<any>(USER + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteUserData(id: number) {
    return this.http.delete<any>(USER + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postUserData(data: any) {
    return this.http.post<any>(USER + '/signup', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }




  /* blog http method */

  getBlogData(pagesize: number, currentpage: number): Observable<any> {
    // const queryParams = ;
    return this.http
      .get<any>(BLOG + `?pageSize=${pagesize}&currentPage=${currentpage}`, {
        headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }),
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  postBlogData(data: any, image: any) {
    let testData: FormData = new FormData();
    console.log(image);


    testData.append('name', data.name);
    testData.append('description', data.description);
    testData.append('image', image);



    return this.http
      .post<any>(
        BLOG,
        testData

      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getBlogDataById(id:number){
    return this.http.get<any>(BLOG + "select/" + id)
      .pipe(map((res:any)=>{return res;}))}



  // getFiles(): Observable<any> {
  //   return this.http.get(BLOG + 'image');
  // }

  updateBlogData(data: any, id: number,image:File) {
    let testData: FormData = new FormData();
    console.log(image);


    testData.append('name', data.name);
    testData.append('description', data.description);
   testData.append('image', image);


    return this.http.patch<any>(BLOG + id, testData).pipe(
      map((res: any) => {
        return res;

      })

    );

  }



  deleteBlogData(id: any) {
    return this.http.delete<any>(BLOG + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
