export interface User {
  id: number;
  userType: UserType;
  name: string;
  firstSurname: string;
  secondSurname: string;
  gender: Gender;
  birthDate: Date;
  nif: string;
  address: Address;
  medicalBoardNumber: string;
  professionalType: ProfessionalType;
  nhc: string;
  insuranceList: InsuranceCompany[];
}

export type Gender = 'Male' | 'Female' | 'Other';
export type ProfessionalType = 'Doctor' | 'Nurse' | 'Administrator';
export type UserType = 'Patient' | 'Professional';
export type InsuranceType = 'Health' | 'Family' | 'Dental';

export interface Address {
  streetName: string;
  streetNumber: string;
  doorNumber: string;
  postalCode: string;
  city: string;
}

export interface InsuranceCompany {
  insuranceCompanyName: string;
  insuranceType: InsuranceType;
  cardNumber: string;
}