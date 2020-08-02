import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { forkJoin, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Professional } from '../models/professional.model';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_BASE_URL = 'https://his-app-alonso.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[][]> {
    const users: Observable<User[]>[] = [];
    users.push(this.getAllPatients());
    users.push(this.getAllProfessionals());
    return forkJoin(users);
  }

  getAllPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.API_BASE_URL + '/patients/');
  }

  getAllProfessionals(): Observable<Professional[]> {
    return this.httpClient.get<Professional[]>(
      this.API_BASE_URL + '/professionals/'
    );
  }

  getUser(id: string, param: string): Observable<User> {
    return this.httpClient.get<User>(`${this.API_BASE_URL}/${param}/${id}`);
  }

  deleteUser(id: string, param: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.API_BASE_URL}/${param}/${id}`);
  }

  createUser(user: User, param: string): Observable<User> {
    return this.httpClient.post<User>(`${this.API_BASE_URL}/${param}`, user);
  }

  updateUser(id: string, param: string, user: User): Observable<User> {
    return this.httpClient.put<User>(
      `${this.API_BASE_URL}/${param}/${id}`,
      user
    );
  }
}
