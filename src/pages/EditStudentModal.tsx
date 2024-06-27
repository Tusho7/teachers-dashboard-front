import React, { useEffect, useState } from "react";
import { EditStudent } from "../types/editStudent";
import { Student } from "../types/student";
import FormField from "../components/FormField";
import { updateStudentData } from "../services/updateStudentData";
import Swal from "sweetalert2";
import { ApiError } from "../types/apiError";
interface Props {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onCloseSuccess: () => void;
}

const EditStudentModal = ({
  student,
  isOpen,
  onClose,
  onCloseSuccess,
}: Props) => {
  const [editedStudent, setEditedStudent] = useState<EditStudent>({
    id: 0,
    first_name: "",
    last_name: "",
    start_date: "",
    phone_number: "",
    payment_status: "",
    payment_date: "",
    attendance_count: 0,
    days_per_week: 0,
    how_much_pays: "",
    currency: "",
    days_of_week: "",
    //@ts-expect-error fix
    hours_of_days: [],
    from_abroad_student: false,
    entrant_student: false,
  });

  const handleAddHour = () => {
    const currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    const hours = prompt(`შეიყვანეთ საათები ასე (13:00, 14:00...)`);

    if (hours) {
      const updatedHours = {
        ...editedStudent.hours_of_days,
        [currentDay]: hours.split(", "),
      };
      //@ts-expect-error fix
      setEditedStudent((prev) => ({
        ...prev!,
        hours_of_days: updatedHours,
      }));
    }
  };

  useEffect(() => {
    if (student) {
      const {
        first_name,
        last_name,
        start_date,
        phone_number,
        payment_status,
        payment_date,
        attendance_count,
        days_per_week,
        how_much_pays,
        currency,
        days_of_week,
        hours_of_days,
        from_abroad_student,
        entrant_student,
      } = student;

      const editedStudentData: EditStudent = {
        id: student.id,
        first_name: first_name ?? "",
        last_name: last_name ?? "",
        start_date: start_date ?? "",
        phone_number: phone_number ?? "",
        payment_status: payment_status ?? "",
        payment_date:
          payment_date instanceof Date
            ? payment_date.toISOString()
            : payment_date ?? "",
        attendance_count: attendance_count ?? 0,
        days_per_week: days_per_week ?? 0,
        how_much_pays: how_much_pays ?? "",
        currency: currency ?? "",
        days_of_week: days_of_week ?? "",
        //@ts-expect-error fix
        hours_of_days: hours_of_days ?? [],
        from_abroad_student: !!from_abroad_student,
        entrant_student: !!entrant_student,
      };

      setEditedStudent(editedStudentData);
    } else {
      setEditedStudent({
        id: 0,
        first_name: "",
        last_name: "",
        start_date: "",
        phone_number: "",
        payment_status: "",
        payment_date: "",
        attendance_count: 0,
        days_per_week: 0,
        how_much_pays: "",
        currency: "",
        days_of_week: "",
        hours_of_days: {},
        from_abroad_student: false,
        entrant_student: false,
      });
    }
  }, [student]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      setEditedStudent((prev) => ({
        ...prev!,
        [name]: isChecked,
      }));
    } else if (name.startsWith("hours_of_days.")) {
      handleHourInputChange(name, value);
    } else if (name === "days_per_week") {
      setEditedStudent((prev) => ({
        ...prev!,
        days_per_week: parseInt(value),
      }));
    } else {
      setEditedStudent((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleHourInputChange = (name: string, value: string) => {
    const day = name.split(".")[1];
    const updatedHours = {
      ...editedStudent.hours_of_days,
      [day]: value,
    };
    setEditedStudent((prev) => ({
      ...prev!,
      hours_of_days: updatedHours,
    }));
  };

  const handleRemoveHour = (day: string) => {
    const updatedHours = { ...editedStudent.hours_of_days };
    delete updatedHours[day];
    setEditedStudent((prev) => ({
      ...prev!,
      hours_of_days: updatedHours,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedStudent((prev) => ({
      ...prev!,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedStudent) {
      try {
        const studentId = editedStudent.id;

        const hoursArray = Object.values(editedStudent.hours_of_days).flatMap(
          (hours) => hours
        );

        await updateStudentData(studentId, {
          ...editedStudent,
          //@ts-expect-error fix
          hours_of_days: hoursArray,
        });
        Swal.fire({
          icon: "success",
          title: "წარმატება",
          text: "მოსწავლის მონაცემები წარმატებით განახლდა",
        });
        onCloseSuccess();
        onClose();
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
        console.error("Error updating student data:", error);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-6 text-center">
              {`${editedStudent?.first_name} ${editedStudent?.last_name}`}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <FormField
                label="დაწყების თარიღი:"
                id="start_date"
                name="start_date"
                type="date"
                value={editedStudent?.start_date || ""}
                onChange={handleInputChange}
              />
              <FormField
                label="ტელეფონის ნომერი:"
                id="phone_number"
                name="phone_number"
                value={editedStudent?.phone_number || ""}
                onChange={handleInputChange}
              />
              <FormField
                label="გადახდის სტატუსი:"
                id="payment_status"
                name="payment_status"
                value={editedStudent?.payment_status || ""}
                type="select"
                options={[
                  { value: "გადახდილი", label: "გადახდილი" },
                  { value: "გადაუხდელი", label: "გადაუხდელი" },
                ]}
                onChange={handleSelectChange}
              />
              <FormField
                label="გადახდის თარიღი:"
                id="payment_date"
                name="payment_date"
                type="date"
                value={editedStudent?.payment_date || ""}
                onChange={handleInputChange}
              />
              <FormField
                label="დასწრების რაოდენობა:"
                id="attendance_count"
                name="attendance_count"
                type="number"
                value={editedStudent?.attendance_count || 0}
                onChange={handleInputChange}
              />
              <FormField
                label="დღეები კვირაში:"
                id="days_per_week"
                name="days_per_week"
                type="number"
                value={editedStudent?.days_per_week || 0}
                onChange={handleInputChange}
              />
              <FormField
                label="თანხა:"
                id="how_much_pays"
                name="how_much_pays"
                value={editedStudent?.how_much_pays || ""}
                onChange={handleInputChange}
              />
              <FormField
                label="ვალუტა:"
                id="currency"
                name="currency"
                value={editedStudent?.currency || ""}
                onChange={handleInputChange}
              />
              <div className="col-span-2">
                <FormField
                  label="დღეები:"
                  id="days_of_week"
                  name="days_of_week"
                  value={editedStudent?.days_of_week || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="hours_of_days"
                  className="block text-sm font-medium text-gray-700"
                >
                  საათები:
                </label>
                {Object.entries(editedStudent?.hours_of_days ?? {}).map(
                  ([day, hour]) => (
                    <div key={day} className="flex items-center mt-2">
                      <span className="mr-2 text-sm">{day}:</span>
                      <input
                        type="text"
                        id={`hours_of_days_${day}`}
                        name={`hours_of_days.${day}`}
                        value={hour as string}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        className="ml-2 text-red-600"
                        onClick={() => handleRemoveHour(day)}
                      >
                        X
                      </button>
                    </div>
                  )
                )}
                <button
                  type="button"
                  className="ml-2 text-red-600"
                  onClick={handleAddHour}
                >
                  ADD
                </button>
              </div>
              <div className="col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="from_abroad_student"
                  name="from_abroad_student"
                  checked={editedStudent?.from_abroad_student}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="from_abroad_student"
                  className="ml-2 block text-sm text-gray-900"
                >
                  საზღვარგარეთიდან მოსწავლე
                </label>
              </div>
              <div className="col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="entrant_student"
                  name="entrant_student"
                  checked={editedStudent?.entrant_student}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="entrant_student"
                  className="ml-2 block text-sm text-gray-900"
                >
                  აბიტურიენტი
                </label>
              </div>
              <div className="col-span-2 flex justify-end space-x-2 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  შენახვა
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  დახურვა
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStudentModal;
