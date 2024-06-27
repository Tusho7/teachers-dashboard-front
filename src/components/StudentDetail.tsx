import React from "react";

interface StudentDetailProps {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

const StudentDetail: React.FC<StudentDetailProps> = ({
  label,
  value,
  valueClassName = "",
}) => {
  return (
    <p className="text-sm text-gray-700 mb-2">
      <span className="font-semibold text-lg">{label}:</span>{" "}
      <span className={valueClassName}>{value}</span>
    </p>
  );
};

export default StudentDetail;
