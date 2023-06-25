import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdsService {

  constructor(private http:HttpClient) { }
  SERVER_URL= "http://127.0.0.1:8000/products";

  getProducts(): Observable<any> {
    return this.http.get<any>(this.SERVER_URL)
  }
  addProducts(formData: FormData): Observable<any> {
    return this.http.post<any>(this.SERVER_URL, formData);
  }
  
  delProducts(id:number):Observable<any>{
    return this.http.delete<any>(this.SERVER_URL+"/"+id);
  }
  updProducts(formData: FormData, id: number): Observable<any> {
    return this.http.put<any>(`${this.SERVER_URL}/${id}`, formData);
  }
  
  
}
