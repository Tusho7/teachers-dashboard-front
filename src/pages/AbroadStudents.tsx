import { useEffect, useState } from "react";
import { getAbroadStudents } from "../services/getStudents";
import { Student } from "../types/student";
import { Link } from "react-router-dom"; // Assuming you are using react-router for navigation

const AbroadStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedStudentId, setExpandedStudentId] = useState<number | null>(
    null
  );

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

  const toggleDetails = (id: number) => {
    setExpandedStudentId(expandedStudentId === id ? null : id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        საზღვარგარეთის სტუდენტები
      </h1>
      <Link
        to="/"
        className="text-blue-500 hover:underline mb-4 block text-center"
      >
        უკან დაბრუნება
      </Link>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="px-6 py-4">
              <p className="text-lg font-semibold text-gray-900">
                {`${student.first_name} ${student.last_name}`}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">დაწყების თარიღი:</span>{" "}
                {student.start_date}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">ტელეფონის ნომერი:</span>{" "}
                {student.phone_number || "N/A"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">გადახდის სტატუსი:</span>{" "}
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
              {expandedStudentId === student.id && (
                <>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">დასწრების რაოდენობა:</span>{" "}
                    {student.attendance_count}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">დღეები კვირაში:</span>{" "}
                    {student.days_per_week}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">
                      მომდევნო გადახდის თარიღი:
                    </span>{" "}
                    {student.next_payment_date || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">თანხა:</span>{" "}
                    {student.how_much_pays} {student.currency}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">დღეები:</span>{" "}
                    {student.days_of_week || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">საათები:</span>
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
                    <span className="font-semibold">
                      მერვე გაკვეთილის თარიღი:
                    </span>{" "}
                    {student.eighth_lesson_date}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">
                      საზღვარგარეთიდან მოსწავლე:
                    </span>{" "}
                    {student.from_abroad_student ? "Yes" : "No"}
                  </p>
                </>
              )}
              <button
                onClick={() => toggleDetails(student.id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {expandedStudentId === student.id ? "დამალვა" : "დაწვრილებით"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbroadStudents;
