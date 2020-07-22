import { User } from './user.model';

export interface Patient extends User {
    nhc: string;
    insuranceList: InsuranceCompany[];
}

export interface InsuranceCompany {
    insuranceCompanyName: string;
    insuranceType: InsuranceType;
    cardNumber: string;
}

export type InsuranceType = 'Dental' | 'Health' | 'Family';
