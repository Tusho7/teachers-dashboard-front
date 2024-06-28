import { FormEvent, useState } from "react";
import VerificationCodeInput from "../components/VerificationCodeInput";
import { registerUser } from "../services/registerUser";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(email, password, firstName, lastName);
      Swal.fire({
        icon: "success",
        title: "წარმატება",
        text: "გთხოვთ შეამოწმოთ ელ-ფოსტა!.",
      });
      setRegistrationComplete(true);
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: "რეგისტრაცია ვერ მოხერხდა",
      });
    } finally {
      setLoading(false);
    }
  };

  if (registrationComplete) {
    return <VerificationCodeInput email={email} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {loading && <Loading />}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          რეგისტრაცია
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="sr-only">
              ელ-ფოსტა
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="ელ-ფოსტა"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="sr-only">
              პაროლი
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="პაროლი"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="firstName" className="sr-only">
              სახელი
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="სახელი"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="sr-only">
              გვარი
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="გვარი"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            რეგისტრაცია
          </button>
          <div className="mt-4 text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              გაქვთ ექაუნთი ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
