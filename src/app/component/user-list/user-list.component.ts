import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  displayedColumns =
    ['name', 'position', 'weight', 'symbol', 'icons'];
  users: User[];
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers()
  }

  onGetUsers() {
    return this.userService.getUsers();
  }

  onDeleteUser(id: number) {
    console.log(id);
    this.userService.deleteUser(id).subscribe(console.log);
    this.userService.getAllUsers();
  }

  onAddUser() {

  }

  onDeleteAllUsers() {
    this.users = [];
    console.log(this.users, "borre");
    // this.userService.deleteAllUsers(this.users);
    // console.log(this.users, "deleted all users");
  }

}
