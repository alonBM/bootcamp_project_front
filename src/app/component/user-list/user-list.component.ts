import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable, forkJoin } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Professional } from 'src/app/models/professional.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns = [
    'nhc',
    'medicalBoardNumber',
    'name',
    'firstSurname',
    'icons',
  ];
  users: MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[][]) => {
        this.users = new MatTableDataSource(data[0].concat(data[1]));
        this.users.paginator = this.paginator;
        this.users.sort = this.sort;
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

  onOpenDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '200px',
      data: {
        title: 'Confirm delete',
        body: 'Are you sure do you want to delete this user?',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        let type: string;
        user.userType === 'Professional'
          ? (type = 'professionals')
          : (type = 'patients');
        this.userService.deleteUser(user._id, type).subscribe(() => {
          this.getAllUsers();
        });
      }
    });
  }

  deleteAllDoctors(): void {
    const professionals: Professional[] = this.users.data.filter(
      (user) => user.userType === 'Professional'
    ) as Professional[];

    const doctors: Professional[] = professionals.filter(
      (professional) => professional.userType === 'Professional'
    );
    const deleteDoctorsPetitions: Observable<User>[] = [];
    for (const doctor of doctors) {
      deleteDoctorsPetitions.push(
        this.userService.deleteUser(doctor._id, 'professionals')
      );
    }
    forkJoin(deleteDoctorsPetitions).subscribe(
      () => {
        this.getAllUsers();
        this.openSnackbar('Doctors has been deleted');
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  openSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
