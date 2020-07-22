export interface User {
  id: number;
  name: string;
  firstSurname: string;
  secondSurname: string;
  gender: Gender;
  birthDate: Date;
  nif: string;
  address: Address;
  nhc: string;
  userType: UserType;
}

export type UserType = 'Patient' | 'Professional';

export type Gender = 'Male' | 'Female' | 'Other';

export interface Address {
  streetName: string;
  streetNumber: string;
  doorNumber: string;
  postalCode: string;
  city: string;
}










