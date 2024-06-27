import React from "react";
import { Student } from "../types/student";
import StudentDetail from "./StudentDetail";

interface StudentCardProps {
  students: Student[];
  expandedStudentIds: number[];
  toggleStudentExpansion: (studentId: number) => void;
  handleOpenModal?: (student: Student) => void;
}

const StudentList: React.FC<StudentCardProps> = ({
  students,
  expandedStudentIds,
  toggleStudentExpansion,
  handleOpenModal,
}) => {
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {students.map((student) => (
        <div
          key={student.id}
          className={`bg-gray-200 border border-gray-400 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${
            expandedStudentIds.includes(student.id) ? "shadow-md" : ""
          }`}
        >
          <div
            className={`flex justify-between items-center px-6 py-4 cursor-pointer ${
              expandedStudentIds.includes(student.id)
                ? "bg-blue-100 rounded-t-lg"
                : "rounded-lg"
            }`}
            onClick={() => toggleStudentExpansion(student.id)}
          >
            <div className="text-lg font-semibold text-gray-900">{`${student.first_name} ${student.last_name}`}</div>
            <svg
              className={`h-6 w-6 text-gray-500 transform transition-transform ${
                expandedStudentIds.includes(student.id) ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  expandedStudentIds.includes(student.id)
                    ? "M5 15l7-7 7 7"
                    : "M19 9l-7 7-7-7"
                }
              />
            </svg>
          </div>
          {expandedStudentIds.includes(student.id) && (
            <div className="px-6 py-4">
              <StudentDetail
                label="დაწყების თარიღი"
                value={student.start_date}
              />
              <StudentDetail
                label="ტელეფონის ნომერი"
                value={student.phone_number || "N/A"}
              />
              <StudentDetail
                label="გადახდის სტატუსი"
                value={student.payment_status}
                valueClassName={
                  student.payment_status === "გადახდილი"
                    ? "text-green-600"
                    : "text-red-600"
                }
              />
              <StudentDetail
                label="დასწრების რაოდენობა"
                value={student.attendance_count}
              />
              <StudentDetail
                label="დღეები კვირაში"
                value={student.days_per_week}
              />
              <StudentDetail
                label="შემდეგი გადახდის თარიღი"
                value={student.next_payment_date || "Not specified"}
              />
              <StudentDetail
                label="თანხა"
                value={`${student.how_much_pays} ${student.currency}`}
              />
              <StudentDetail
                label="დღეები"
                value={student.days_of_week || "Not specified"}
              />
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-lg">საათები:</span>
              </p>
              <ul className="list-disc ml-4 text-gray-700">
                {Object.entries(student.hours_of_days || {}).map(
                  ([day, hours]) => (
                    <li key={day} className="text-sm">
                      {`${day}: ${hours}`}
                    </li>
                  )
                )}
              </ul>
              <StudentDetail
                label="მერვე გაკვეთილის თარიღი"
                value={student.eighth_lesson_date}
              />
              <StudentDetail
                label="საზღვარგარეთი"
                value={student.from_abroad_student ? "კი" : "არა"}
              />
              <StudentDetail
                label="აბიტურიენტი"
                value={student.entrant_student ? "კი" : "არა"}
              />
              {handleOpenModal && (
                <button
                  className="w-full bg-cyan-700 p-2 rounded-lg text-white mt-5"
                  onClick={() => handleOpenModal(student)}
                >
                  ცვლილება
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentList;
