import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User, } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isProfessional: boolean;
  user = {};
  userId: number;
  maxDate = new Date();
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.createUserForm();
    // If in update, get de values from user which have to updated.
    this.userId = this.route.snapshot.params.id;
    if (this.userId) {
      this.setFormValues(this.userId);
    }
    console.log(this.userForm)
  }


  getInsuraceListFormGroup(user: User): FormGroup[] {
    const formGroup: FormGroup[] = [];
    user.insuranceList.forEach((element) => {
      formGroup.push(
        new FormGroup({
          insuranceCompanyName: new FormControl(element.insuranceCompanyName),
          insuranceType: new FormControl(element.insuranceType),
          cardNumber: new FormControl(element.cardNumber)
        })
      )
    })
    return formGroup;
  }

  setFormValues(id: number) {
    this.userService.getUser(id).subscribe((user) => {
      // console.log(this.getInsuraces(user));
      // console.log('user insurances:', this.getInsuraces(user))
      console.log('las listas son:  ', user.insuranceList)
      this.userForm.get('personalData').patchValue({
        name: user.name,
        firstSurname: user.firstSurname,
        secondSurname: user.secondSurname,
        gender: user.gender,
        birthDate: user.birthDate,
        nif: user.nif,
        userType: user.userType
      })
      this.userForm.get('address').patchValue({
        streetName: user.address.streetName,
        streetNumber: user.address.streetNumber,
        doorNumber: user.address.doorNumber,
        postalCode: user.address.postalCode,
        city: user.address.city
      })
      this.userForm.get('medicalData').patchValue({
        nhc: user.nhc,
        medicalBoardNumber: user.medicalBoardNumber,
        professionalType: user.professionalType
      })
      console.log('las control son:  ', this.insuranceList);
      console.log('las listas soon:  ', user.insuranceList);
      const formArrayControl = new FormArray([]);
      this.getInsuraceListFormGroup(user).forEach((element) => {
        formArrayControl.push(element);
      });

      (<FormGroup>this.userForm.get('medicalData')).setControl('insuranceList', formArrayControl)
      // this.userForm.setControl('medicalData.insuranceList', formArrayControl );

      // (<FormArray>this.userForm.get('medicalData'))
      //  this.getInsuraceListFormGroup()
      // // .setControl(3,);
      // this.insuranceList.setControl(3,this.getInsuraceListFormGroup(user))
      // array = new FormArray()
      // this.insuranceList.setControl(3, <AbstractControl>user.insuranceList);


    })
  }

  createUserForm(): void {
    this.userForm = new FormGroup({
      'personalData': new FormGroup({
        'name': new FormControl('', Validators.required),
        'firstSurname': new FormControl('', Validators.required),
        'secondSurname': new FormControl(''),
        'gender': new FormControl('Male'),
        'birthDate': new FormControl(''),
        'nif': new FormControl('', Validators.required),
        'userType': new FormControl('patient')
      }),
      'address': new FormGroup({
        'street': new FormControl(''),
        'streetNumber': new FormControl(''),
        'doorNumber': new FormControl(''),
        'postalCode': new FormControl(''),
        'city': new FormControl('', Validators.required)
      }),
      'medicalData': new FormGroup({
        'medicalBoardNumber': new FormControl('', Validators.required),
        'professionalType': new FormControl('Doctor'),
        'nhc': new FormControl('', Validators.required),
        'insuranceList': new FormArray([])
      }),
    })
  }

  onAddInsurance(): void {
    const groupControl = new FormGroup({
      'insuranceCompanyName': new FormControl(''),
      'insuranceType': new FormControl(''),
      'cardNumber': new FormControl('')
    })
    console.log(groupControl)
    this.insuranceList.push(groupControl)
  }

  get insuranceList(): FormArray {
    return this.userForm.get('medicalData').get('insuranceList') as FormArray;
  }


  buildUser(): void {
    const userValue = this.userForm.value;
    this.user = {
      ...userValue.personalData,
      ...userValue.medicalData,
      address: userValue.address
    }
    console.log('objeto user: ', this.user);
  }

  setUserType(userType: string) {
    (userType === 'professional') ?
      this.isProfessional = true : this.isProfessional = false;
  }

  onSubmit(): void {
    //construimos el objeto con los datos a enviar
    this.buildUser();
    if (this.isProfessional) {
      (<FormGroup>this.userForm.get('medicalData')).removeControl('nhc');
      (<FormGroup>this.userForm.get('medicalData')).removeControl('insuranceList');
    } else {
      (<FormGroup>this.userForm.get('medicalData')).removeControl('medicalBoardNumber');
      (<FormGroup>this.userForm.get('medicalData')).removeControl('professionalType');
    }
    if (this.userId) {
      this.userService.updateUser(this.userId, <User>this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(<User>this.user).subscribe(() => {
        this.router.navigate(['/users']);
      })
    }

  }

  
  setCorrectValidators(): void {
    if (this.isProfessional) {
      this.userForm.get('medicalData').get('nhc').clearValidators();
      this.userForm.get('medicalData').get('nhc').updateValueAndValidity();
    } else {
      this.userForm.get('medicalData').get('medicalBoardNumber').clearValidators();
      this.userForm.get('medicalData').get('medicalBoardNumber').updateValueAndValidity();
    }
  }

}
