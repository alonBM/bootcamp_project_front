import { User } from './user.model';

export interface Professional extends User {
    medicalBoardNumber: string;
    professionalType: ProfessionalType;
}

export type ProfessionalType = 'Doctor' | 'Nurse' | 'Administrator';
