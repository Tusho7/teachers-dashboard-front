import { useEffect, useState } from "react";
import { getAbroadStudents } from "../services/getStudents";
import { Student } from "../types/student";

const AbroadStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Abroad Students List
      </h1>

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
                <span className="font-semibold">Start Date:</span>{" "}
                {student.start_date}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Phone Number:</span>{" "}
                {student.phone_number || "N/A"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Payment Status:</span>{" "}
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
                <span className="font-semibold">Attendance Count:</span>{" "}
                {student.attendance_count}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Days Per Week:</span>{" "}
                {student.days_per_week}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Next Payment Date:</span>{" "}
                {student.next_payment_date || "Not specified"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Amount:</span>{" "}
                {student.how_much_pays} {student.currency}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Days of Week:</span>{" "}
                {student.days_of_week || "Not specified"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Hours:</span>
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
                <span className="font-semibold">Eighth Lesson Date:</span>{" "}
                {student.eighth_lesson_date}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">From Abroad:</span>{" "}
                {student.from_abroad_student ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbroadStudents;
