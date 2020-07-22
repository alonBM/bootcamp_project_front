import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable, forkJoin } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Professional } from 'src/app/models/professional.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  displayedColumns =
    ['id', 'nhc', 'medicalBoardNumber', 'name', 'firstSurname', 'icons'];
  users: User[];
  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllUsers();

  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((data: User[][]) => {
      this.users = data[0].concat(data[1]);
    });
  }

  // onDeleteUser(id: number): void {
  //   this.userService.deleteUser(id).subscribe(console.log);
  //   this.userService.getAllUsers();
  // }

  onOpenDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '200px',
      data: {
        title: 'Delete user ' + user.id,
        body: 'Are you sure ?',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        let type: string;
        (user.userType === 'Professional') ?
          type = 'professionals' : type = 'patients';
        console.log(type);
        this.userService.deleteUser(user.id, type).subscribe(() => {
          this.getAllUsers();
        });
      }
    });
  }

  deleteAllDoctors(): void {
    const professionals: Professional[] = this.users.filter(
      (user) => user.userType === 'Professional'
    ) as Professional[];

    const doctors: Professional[] = (professionals).filter(
      (professional) => professional.userType === 'Professional'
    );

    const deleteDoctorsPetitions: Observable<User>[] = [];
    for (const doctor of doctors) {
      deleteDoctorsPetitions.push(this.userService.deleteUser(doctor.id, 'professionals'));
    }
    forkJoin(deleteDoctorsPetitions).subscribe(() => {
      this.getAllUsers();
    });
  }

}
