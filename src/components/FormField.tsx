import { FormFieldProps } from "../types/formFieldsProps";

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  value,
  type = "text",
  options,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "select" && options ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      )}
    </div>
  );
};

export default FormField;
