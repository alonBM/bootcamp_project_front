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
      ['name', 'position', 'weight', 'symbol','icons'];
  users: User[];
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    // this.userService.getUsers().toPromise().then((data) => {
    //   this.users = data;
    // }).then(console.log)
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);
    })
  }

}
