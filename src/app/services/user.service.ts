import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_BASE_URL = 'http://localhost:3000';


  constructor(private httpClient: HttpClient) { }

  getUsers(): any {
    return this.httpClient.get<any>(this.API_BASE_URL + '/users/');
  }

  getUser( id: number): any {
    return this.httpClient.get<any>(this.API_BASE_URL + '/users/' + id );
  }

}
