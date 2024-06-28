import { useEffect, useState } from "react";
import { getStudents } from "../services/getStudents";
import { Student } from "../types/student";
import allStudents from "../assets/allStudents.jpeg";
import EditStudentModal from "./EditStudentModal";
import StudentList from "../components/StudentList";
import StudentsNavigation from "../components/StudentsNavigation";
import { destroyStudent } from "../services/deleteStudent";
import Swal from "sweetalert2";
import { useUser } from "../contexts/useUser";

const AllStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [expandedStudentIds, setExpandedStudentIds] = useState<number[]>([]);
  const userId = useUser().user?.id;

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [fetchStudents, setFetchStudents] = useState<() => void>(
    () => () => {}
  );

  console.log(students);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents(userId);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    setFetchStudents(() => fetchStudents);
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

  const handleDeleteStudent = async (studentId: number) => {
    try {
      await destroyStudent(studentId);

      Swal.fire({
        icon: "success",
        title: "წარმატება",
        text: "სტუდენტი წაიშალა",
      });

      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: "სტუდენტი ვერ წაიშალა",
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${allStudents})` }}
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

        <StudentsNavigation />

        <StudentList
          students={filteredStudents}
          expandedStudentIds={expandedStudentIds}
          toggleStudentExpansion={toggleStudentExpansion}
          handleOpenModal={handleOpenModal}
          handleDeleteStudent={handleDeleteStudent}
        />

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
