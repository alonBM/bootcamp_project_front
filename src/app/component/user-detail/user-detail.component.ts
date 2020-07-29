import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.userService.getUser(params.id, params.resource)
      .subscribe(
        data => {
          this.user = data;
        },
        (error: Error) => {
          console.error(error);
        });
  }

  getUser(): void {

  }


}
