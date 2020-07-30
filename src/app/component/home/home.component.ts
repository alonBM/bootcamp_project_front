import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    if (this.authService.isSignedIn()) {
      this.router.navigate(['/users']);
    }
    this.isLogin = true;
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }


  // TIPAR TIPAR TIPAR TIPAR
  onSubmit(): void {
    if (this.isLogin) {
      console.log(this.isLogin);
      this.authService.signIn(this.loginForm.value).subscribe((data: any) => {
        console.log(data.token);
        localStorage.setItem('token', data.token);
        this.openSnackbar('logged in');
        this.router.navigate(['/users']);

      });
      console.log(this.loginForm.value);
    } else {
      this.authService.signUp(this.loginForm.value).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
  toRegister(): void {
    this.isLogin = false;
  }

}
