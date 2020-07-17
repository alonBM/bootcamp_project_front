import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUser(this.route.snapshot.params.id)
      .subscribe(data => this.user = data);
  }

  // onEditUser(): void {
  //   this.userService.updateUser()
  // }

}
