import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_BASE_URL = 'http://localhost:3000';
  private users: User[];


  constructor(private httpClient: HttpClient) { }

  getAllUsers(): any {
    return this.httpClient.get<User[]>(this.API_BASE_URL + '/users/')
      .subscribe(users => this.users = users);
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.API_BASE_URL + '/users/' + id);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_BASE_URL + '/users', user)
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.API_BASE_URL + '/users/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.API_BASE_URL + '/users/' + user.id, user)
  }





  deleteAllUsers(): void {
    //filter our users array.
    //for each, deleteUser(index)

  }

}
