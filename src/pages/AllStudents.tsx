import { useEffect, useState } from "react";
import { getStudents } from "../services/getStudents";
import { Student } from "../types/student";
import { Link } from "react-router-dom";
import EnglishBooks from "../assets/english_books.jpg";
import EditStudentModal from "./EditStudentModal";

const AllStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [expandedStudentIds, setExpandedStudentIds] = useState<number[]>([]);

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [fetchStudents, setFetchStudents] = useState<() => void>(
    () => () => {}
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    setFetchStudents(() => fetchStudents);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const searchLower = search.toLowerCase();
    return (
      student.first_name.toLowerCase().includes(searchLower) ||
      student.last_name.toLowerCase().includes(searchLower) ||
      student.phone_number?.toLowerCase().includes(searchLower) ||
      student.currency?.toLowerCase().includes(searchLower) ||
      student.days_of_week?.toLowerCase().includes(searchLower)
    );
  });

  const handleOpenModal = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleUpdateSuccess = () => {
    fetchStudents();
  };

  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${EnglishBooks})` }}
    >
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          ცხრილი
        </h1>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="მოსწავლის ძებნა..."
            value={search}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-lg"
          />
        </div>

        <div className="mb-8 flex justify-center space-x-4">
          <Link
            to="/entrant_students"
            className="px-6 py-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            აბიტურიენტები
          </Link>
          <Link
            to="/abroad_students"
            className="px-6 py-2 text-white bg-green-500 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            საზღვარგარეთი
          </Link>
          <Link to="/add_student">
            <button className="px-6 py-2 text-white bg-purple-500 rounded-full shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
              მოსწავლის დამატება
            </button>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStudents.map((student) => (
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

                  <button
                    className="w-full bg-cyan-700 p-2 rounded-lg text-white mt-5"
                    onClick={() => handleOpenModal(student)}
                  >
                    ცვლილება
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <EditStudentModal
          isOpen={!!selectedStudent}
          onClose={() => {
            setSelectedStudent(null);
            fetchStudents();
          }}
          onCloseSuccess={handleUpdateSuccess}
          student={selectedStudent}
        />
      </div>
    </div>
  );
};

export default AllStudents;
