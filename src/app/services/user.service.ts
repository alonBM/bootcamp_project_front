import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { forkJoin, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Professional } from '../models/professional.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_BASE_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.get<Professional[]>(this.API_BASE_URL + '/professionals/');

  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.API_BASE_URL + '/users/' + id);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_BASE_URL + '/users', user);
  }


  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.API_BASE_URL + '/users/' + id);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(this.API_BASE_URL + '/users/' + id, user);
  }

  deleteAllDoctors(): any {

    const doctors: User[] = this.users.filter(
      (user) => user.professionalType === 'Doctor'
    );

    const deleteDoctorsPetitions: Observable<User>[] = [];
    for (let doctor of doctors) {
      deleteDoctorsPetitions.push(this.deleteUser(doctor.id));
    }

    return forkJoin(deleteDoctorsPetitions);


  }

}
