//  this is service file which is used for handling the crud operations of various components
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {

  readonly ROOT_URL;

  constructor(private http : HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }
  
  create(uri:String, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`,payload);
  }

  read(uri : String){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  update(uri : String, payload : Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`,payload);
  }

  delete(uri : String){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
