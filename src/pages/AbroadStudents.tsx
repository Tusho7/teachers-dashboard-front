import { useEffect, useState } from "react";
import { getAbroadStudents } from "../services/getStudents";
import { Student } from "../types/student";
import { Link } from "react-router-dom";
import Abroad from "../assets/studyabroad.jpg";
import StudentList from "../components/StudentList";
import { useUser } from "../contexts/useUser";

const AbroadStudents = () => {
  const userId = useUser().user?.id;
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedStudentIds, setExpandedStudentIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAbroadStudents(userId);
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Error fetching students. Please try again later.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, [userId]);

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

        <StudentList
          students={students}
          expandedStudentIds={expandedStudentIds}
          toggleStudentExpansion={toggleStudentExpansion}
        />
      </div>
    </div>
  );
};

export default AbroadStudents;
