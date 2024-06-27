import { ChangeEvent, useState } from "react";
import { addStudent } from "../services/addStudent";
import { FormData } from "../types/formData";
import Swal from "sweetalert2";
import { ApiError } from "../types/apiError";
import StudentsImage from "../assets/students.jpg";

const AddStudent = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    start_date: "",
    phone_number: "",
    facebook_profile: "",
    how_much_pays: 0,
    currency: "GEL",
    payment_status: "გადახდილი",
    days_per_week: 0,
    days_of_week: "",
    hours_of_days: [""],
    entrant_student: false,
    from_abroad_student: false,
    payment_date: "",
  });

  const handleHourChange = (index: number, value: string) => {
    const newHours = [...formData.hours_of_days];
    newHours[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      hours_of_days: newHours,
    }));
  };

  const addHourInput = () => {
    setFormData((prevData) => ({
      ...prevData,
      hours_of_days: [...prevData.hours_of_days, ""],
    }));
  };

  const removeHourInput = (index: number) => {
    const newHours = [...formData.hours_of_days];
    newHours.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      hours_of_days: newHours,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: isChecked,
      }));
    } else if (name === "days_per_week") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const filteredHours = formData.hours_of_days.filter(
        (hour) => hour.trim() !== ""
      );

      const filteredData = {
        ...formData,
        hours_of_days: filteredHours.length > 0 ? filteredHours : undefined,
        payment_status:
          formData.payment_status === "გადახდილი" ||
          formData.payment_status === "გადაუხდელი"
            ? formData.payment_status
            : undefined,
      };

      await addStudent(filteredData);
      Swal.fire({
        icon: "success",
        title: "წარმატება",
        text: "მოსწავლის მონაცემები წარმატებით დაემატა!",
      });
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.response?.data?.message ||
        "მოსწავლის მონაცემების განახლებისას მოხდა შეცდომა";
      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: errorMessage,
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="bg-gray-100 min-h-screen flex items-center justify-center p-4 bg-cover"
      style={{
        backgroundImage: `url(${StudentsImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          მოსწავლის დამატება
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block mb-4">
                <span className="text-gray-700">სახელი</span>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="form-input mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">გვარი</span>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="form-input mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">დაწყების თარიღი</span>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  className="form-input mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">ტელეფონის ნომერი</span>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="form-input mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Facebook პროფილი</span>
                <input
                  type="url"
                  name="facebook_profile"
                  value={formData.facebook_profile}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">თანხა</span>
                <input
                  type="number"
                  name="how_much_pays"
                  value={formData.how_much_pays}
                  onChange={handleChange}
                  required
                  className="form-input mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                />
              </label>
            </div>

            <div className="col-span-1">
              <label className="block mb-4">
                <span className="text-gray-700">გადახდის სტატუსი</span>
                <select
                  name="payment_status"
                  value={formData.payment_status}
                  onChange={handleChange}
                  required
                  className="form-select mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                >
                  <option value="გადახდილი">გადახდილი</option>
                  <option value="გადაუხდელი">გადაუხდელი</option>
                </select>
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">გადახდის თარიღი</span>
                <input
                  type="date"
                  name="payment_date"
                  value={formData.payment_date}
                  onChange={handleChange}
                  className="form-input mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">ვალუტა</span>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                  className="form-select mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                >
                  <option value="GEL">GEL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">დღეების რაოდენობა კვირაში</span>
                <input
                  type="number"
                  name="days_per_week"
                  value={formData.days_per_week}
                  onChange={handleChange}
                  required
                  className="form-input mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">კვირის დღეები</span>
                <input
                  type="text"
                  name="days_of_week"
                  value={formData.days_of_week}
                  onChange={handleChange}
                  required
                  className="form-input mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">საათები</span>
                {formData.hours_of_days.map((hour, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      type="text"
                      value={hour}
                      onChange={(e) => handleHourChange(index, e.target.value)}
                      className="form-input w-full rounded-md bg-gray-200 border-transparent focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 px-4 py-2"
                    />
                    {index === 0 && ( // Show add button for the first input only
                      <button
                        type="button"
                        onClick={addHourInput}
                        className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        +
                      </button>
                    )}
                    {index > 0 && ( // Show remove button for additional inputs
                      <button
                        type="button"
                        onClick={() => removeHourInput(index)}
                        className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="entrant_student"
                    checked={formData.entrant_student}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">აბიტურიენტი</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="from_abroad_student"
                    checked={formData.from_abroad_student}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">
                    საზღვარგარეთის მოსწავლე
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              დამატება
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
