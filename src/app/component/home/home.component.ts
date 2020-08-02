import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  isLogin: boolean;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  openSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    if (this.authService.isSignedIn()) {
      this.router.navigate(['/users']);
    }
    this.isLogin = true;
    this.setForm();

  }

  setForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ''
    });
  }

  onSubmit(): void {
    if (this.loginForm.status === 'VALID') {
      if (this.isLogin) {
        this.authService.signIn(this.loginForm.value).subscribe((data: any) => {
          localStorage.setItem('token', data.token);
          this.openSnackbar('logged in');
          this.router.navigate(['/users']);
        },
          (error) => {
            this.openSnackbar('An error has occurred');
            console.error('An error has occurred', error);
            this.setForm();
            this.router.navigate(['/home']);
          });
      } else {
        this.authService.signUp(this.loginForm.value).subscribe(() => {
          this.openSnackbar('Your account has been successfully created');
          this.isLogin = true;
          this.setForm();
          this.router.navigate(['/home']);
        },
          (error) => {
            this.openSnackbar('An error has occurred');
            console.error('An error has occurred', error);
          });
      }
    } else {
      this.openSnackbar('Please introduce something valid');
    }

  }
  toRegister(): void {
    this.setForm();
    this.isLogin = false;
  }

  toLogin(): void {
    this.isLogin = true;
    this.setForm();
  }

}
