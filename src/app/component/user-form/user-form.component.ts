import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isProfessional: boolean;
  user = {};
  maxDate = new Date();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'personalData': new FormGroup({
        'name': new FormControl(null),
        'firstSurname': new FormControl(null),
        'secondSurname': new FormControl(null),
        'gender': new FormControl(null),
        'birthDate': new FormControl(null),
        'nif': new FormControl(null),
        'userType': new FormControl(null)
      }),
      'address': new FormGroup({
        'street': new FormControl(null),
        'streetNumber': new FormControl(null),
        'doorNumber': new FormControl(null),
        'postalCode': new FormControl(null),
        'city': new FormControl(null)
      }),
      'medicalData': new FormGroup({
        'medicalBoardNumber': new FormControl(null),
        'professionalType': new FormControl(null),
        'nhc': new FormControl(null),
        'insuranceCompanyName': new FormControl(null),
        'insuranceType': new FormControl(null),
        'cardNumber': new FormControl(null)
      })
    })
  }

  buildUser(): void {
    console.log(this.userForm);
  }

  setUserType(userType: string) {
    (userType === 'professional') ?
      this.isProfessional = true : this.isProfessional = false;
  }
  onSubmit(): void {

    console.log(this.userForm);
    // this.userService.createUser(userForm)
    //   .subscribe(console.log)

  }

}
