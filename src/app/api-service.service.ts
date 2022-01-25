import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) {
    this.getdata()
   }
  getdata(){
    // console.log("hello")
    return this.http.get('https://jusbid.in:1337/get-popular-hotels')
  }
}
