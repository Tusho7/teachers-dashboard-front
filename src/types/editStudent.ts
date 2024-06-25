export interface EditStudent {
  id: number;
  first_name: string;
  last_name: string;
  start_date: string;
  phone_number: string;
  payment_status: string;
  payment_date: string;
  attendance_count: number;
  days_per_week: number;
  how_much_pays: string;
  currency: string;
  days_of_week: string;
  hours_of_days: Record<string, string>;
  from_abroad_student: boolean;
  entrant_student: boolean;
}
