export interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  value: string | number;
  type?: string;
  options?: { value: string; label: string }[];
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}
