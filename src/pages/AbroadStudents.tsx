import { useEffect, useState } from "react";
import { getAbroadStudents } from "../services/getStudents";
import { Student } from "../types/student";
import { Link } from "react-router-dom";
import Abroad from "../assets/studyabroad.jpg";

const AbroadStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedStudentIds, setExpandedStudentIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAbroadStudents();
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Error fetching students. Please try again later.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const toggleStudentExpansion = (studentId: number) => {
    if (expandedStudentIds.includes(studentId)) {
      setExpandedStudentIds(
        expandedStudentIds.filter((id) => id !== studentId)
      );
    } else {
      setExpandedStudentIds([...expandedStudentIds, studentId]);
    }
  };
  if (loading) {
    return <div>იტვირთება...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover"
      style={{
        backgroundImage: `url(${Abroad})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          საზღვარგარეთის სტუდენტები
        </h1>
        <Link
          to="/"
          className="text-blue-500 hover:underline mb-4 block text-center"
        >
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            უკან დაბრუნება
          </button>
        </Link>
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
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">
                      დაწყების თარიღი:
                    </span>{" "}
                    {student.start_date}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">
                      ტელეფონის ნომერი:
                    </span>{" "}
                    {student.phone_number || "N/A"}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">
                      გადახდის სტატუსი:
                    </span>{" "}
                    <span
                      className={
                        student.payment_status === "გადახდილი"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {student.payment_status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">
                      დასწრების რაოდენობა:
                    </span>{" "}
                    {student.attendance_count}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">
                      დღეები კვირაში:
                    </span>{" "}
                    {student.days_per_week}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">
                      შემდეგი გადახდის თარიღი:
                    </span>{" "}
                    {student.next_payment_date || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">თანხა:</span>{" "}
                    {student.how_much_pays} {student.currency}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">დღეები:</span>{" "}
                    {student.days_of_week || "Not specified"}
                  </p>
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
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">
                      მერვე გაკვეთილის თარიღი:
                    </span>{" "}
                    {student.eighth_lesson_date}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">
                      საზღვარგარეთი:
                    </span>{" "}
                    {student.from_abroad_student ? "კი" : "არა"}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold text-lg">
                      აბიტურიენტი: {student.entrant_student ? "კი" : "არა"}
                    </span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AbroadStudents;
