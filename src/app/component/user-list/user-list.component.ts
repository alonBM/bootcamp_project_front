import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    this.userService.getAllUsers().subscribe((data: User[][]) => {
      this.users = data[0].concat(data[1]);
    });
  }

  onGetUsers() {
    return this.userService.getUsers();
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(console.log);
    this.userService.getAllUsers();
  }

  onOpenDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '200px',
      data: {
        title: 'Delete user ' + id,
        body: 'Are you sure ?',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.userService.deleteUser(id).subscribe(() => {
          this.userService.getAllUsers();
        });

      }
    });
  }

  onDeleteAllDoctors() {
    this.userService.deleteAllDoctors().subscribe(() => {
      this.userService.getAllUsers();
    });
  }

}
