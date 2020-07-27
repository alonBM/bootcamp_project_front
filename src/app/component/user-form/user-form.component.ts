import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User, } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Professional } from 'src/app/models/professional.model';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  patientForm: FormGroup;
  professionalForm: FormGroup;
  personalForm: FormGroup;
  addressForm: FormGroup;
  isProfessional: boolean;
  userType: string;
  userId: string;
  user = {};
  maxDate = new Date();
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setPersonalForm();
    this.setAddressForm();
    this.setProfessionalForm();
    this.setPatientForm();
    this.isProfessional = true;
    this.userId = this.route.snapshot.params.id;
    this.userType = this.route.snapshot.params.resource;
    if (this.userId) {
      (this.userType === 'professionals') ?
        this.isProfessional = true : this.isProfessional = false;
      this.setUpdateForm(this.userId, this.userType);
    }

  }

  setPersonalForm(): void {
    this.personalForm = this.fb.group({
      name: ['', Validators.required],
      surname: '',
      firstSurname: '',
      secondSurname: '',
      gender: '',
      birthDate: '',
      nif: '',
      userType: 'Professional'
    });
  }
  setAddressForm(): void {
    this.addressForm = this.fb.group({
      streetName: '',
      streetNumber: '',
      doorNumber: '',
      postalCode: '',
      city: ''
    });
  }
  setProfessionalForm(): void {
    this.professionalForm = this.fb.group({
      medicalBoardNumber: ['', Validators.required],
      professionalType: 'Doctor'
    });
  }
  setPatientForm(): void {
    this.patientForm = this.fb.group({
      nhc: ['', Validators.required],
      insuranceList: this.fb.array([])
    });
  }

  getInsuranceListFormGroup(patient: Patient): FormGroup[] {
    const formGroup: FormGroup[] = [];
    patient.insuranceList.forEach((insurance) => {
      formGroup.push(this.fb.group({
        insuranceCompanyName: insurance.insuranceCompanyName,
        insuranceType: insurance.insuranceType,
        cardNumber: insurance.cardNumber
      }));
    });
    return formGroup;
  }

  setUpdateForm(id: string, resource: string): void {
    this.userService.getUser(id, resource).subscribe((user) => {
      this.personalForm.patchValue({
        name: user.name,
        firstSurname: user.firstSurname,
        secondSurname: user.secondSurname,
        gender: user.gender,
        birthDate: user.birthDate,
        nif: user.nif,
        userType: user.userType
      });
      this.addressForm.patchValue({
        streetName: user.address.streetName,
        streetNumber: user.address.streetNumber,
        doorNumber: user.address.doorNumber,
        postalCode: user.address.postalCode,
        city: user.address.city
      });
      if (resource === 'professionals') {
        this.professionalForm.patchValue({
          medicalBoardNumber: (user as Professional).medicalBoardNumber,
          professionalType: (user as Professional).professionalType
        });
      } else {
        this.patientForm.patchValue({
          nhc: (user as Patient).nhc
        });
        const formArrayControl = this.fb.array([]);
        // console.log((user as Patient).insuranceList);
        // console.log((user as Patient).nhc);
        this.getInsuranceListFormGroup(user as Patient).forEach((insurance) => {
          formArrayControl.push(insurance);
        });
        this.patientForm.setControl('insuranceList', formArrayControl);
      }
    });
  }

  onAddInsurance(): void {
    const groupControl = this.fb.group({
      insuranceCompanyName: '',
      insuranceType: '',
      cardNumber: ''
    });
    this.getInsuranceList().push(groupControl);
  }

  getInsuranceList(): FormArray {
    return this.patientForm.get('insuranceList') as FormArray;
  }

  buildUser(): void {
    if (this.isProfessional) {
      this.user = {
        ...this.personalForm.value,
        address: { ...this.addressForm.value },
        ...this.professionalForm.value,
      };
    } else {
      this.user = {
        ...this.personalForm.value,
        address: { ...this.addressForm.value },
        ...this.patientForm.value,
      };
    }
  }

  onSubmit(): void {
    this.buildUser();
    let type: string;
    (this.isProfessional) ? type = 'professionals' : type = 'patients';
    console.log('tipo usuario: ', type);
    if (this.userId) {
      this.userService.updateUser(this.userId, type, this.user as User).subscribe(() => {
        console.log(this.user);
        this.router.navigate(['/users']);
      });

    } else {
      this.userService.createUser(this.user as User, type).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
    // enviar segun caso
    console.log(this.user);
  }

  setUserType(userType: string): void {
    if (userType === 'professional') {
      this.isProfessional = true;
    } else {
      this.isProfessional = false;
    }
  }


  // onSubmit(): void {
  //   //construimos el objeto con los datos a enviar

  //   if (this.isProfessional) {
  //     (<FormGroup>this.userForm.get('medicalData')).removeControl('nhc');
  //     (<FormGroup>this.userForm.get('medicalData')).removeControl('insuranceList');
  //   } else {
  //     (<FormGroup>this.userForm.get('medicalData')).removeControl('medicalBoardNumber');
  //     (<FormGroup>this.userForm.get('medicalData')).removeControl('professionalType');
  //   }
  //   this.buildUser();
  //   if (this.userId) {
  //     this.userService.updateUser(this.userId, <User>this.user).subscribe(() => {
  //       this.router.navigate(['/users']);
  //     });
  //   } else {
  //     this.userService.createUser(<User>this.user).subscribe(() => {
  //       this.router.navigate(['/users']);
  //     })
  //   }

  // }
}
