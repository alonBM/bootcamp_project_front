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
    ['name', 'position', 'weight', 'symbol', 'icons'];
  users: User[];
  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers();
  }

  onGetUsers() {
    return this.userService.getUsers();
  }

  onDeleteUser(id: number): void {
    console.log(id);
    this.userService.deleteUser(id).subscribe(console.log);
    this.userService.getAllUsers();
  }

  onOpenDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Delete user ' + id,
        body: 'Are you sure you want to delete this user?',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.userService.deleteUser(id).subscribe(() => {
        this.userService.getAllUsers();
      })
    })
  }

  onDeleteAllDoctors() {
    // const doctors: User[] = this.users.filter(
    //   (user: User) => user.professionalType === 'Doctor'
    // );deleteAllDoctors()
    this.userService.deleteAllDoctors().subscribe(() => {
      this.userService.getAllUsers();
    }

    )
    // console.log(doctors);


    // this.userService.deleteAllUsers(this.users);
    // console.log(this.users, "deleted all users");
  }

}
