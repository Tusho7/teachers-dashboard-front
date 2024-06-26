export interface FormData {
  first_name: string;
  last_name: string;
  start_date: string;
  phone_number: string;
  facebook_profile: string;
  how_much_pays: number;
  currency: string;
  payment_status: string;
  days_per_week: number;
  days_of_week: string;
  hours_of_days: string[];
  entrant_student: boolean;
  from_abroad_student: boolean;
  payment_date: string;
}

export interface StudentFormData {
  first_name: string;
  last_name: string;
  start_date: string;
  phone_number: string;
  facebook_profile?: string;
  how_much_pays: number;
  currency: string;
  payment_status?: string;
  days_per_week: number;
  days_of_week: string;
  hours_of_days?: string[];
  entrant_student?: boolean;
  from_abroad_student?: boolean;
  payment_date?: string;
}
