export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  start_date: string;
  phone_number?: string | null;
  facebook_profile?: string | null;
  how_much_pays: string;
  currency: "GEL" | "USD" | "EUR";
  payment_status: "გადახდილი" | "გადაუხდელი";
  days_per_week: number;
  payment_date?: Date | null;
  next_payment_date?: string | null;
  attendance_count: number;
  days_of_week?: string | null;
  hours_of_days?: Record<string, string> | null;
  eighth_lesson_date?: string | null;
  entrant_student: boolean;
  from_abroad_student: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type StudentList = Student[];
