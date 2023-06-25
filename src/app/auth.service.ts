import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SERVER_URL="http://127.0.0.1:8000/"
  constructor(private http: HttpClient) { }
  Checkout(cart:any[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    })
    return this.http.post<any>(this.SERVER_URL +"checkout",cart, { headers: headers });
  }
  login(pwd:string,user:String):Observable<any>{
    return this.http.post<any>(this.SERVER_URL+"login/",{username:user,password:pwd});
  }
}