import { ChangeEvent, FormEvent, useState } from "react";
import { updateUser } from "../services/updateUser";
import { useUser } from "../contexts/useUser";
import Swal from "sweetalert2";
import SettingsIcon from "../assets/settings.jpg";
import Loading from "../components/Loading";
import VerificationCodeInput from "../components/VerificationCodeInput";

const Settings = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [updateComplete, setUpldateComplete] = useState(false);

  const { user } = useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser(user?.id, formData);
      Swal.fire({
        icon: "success",
        title: "წარმატება",
        text: "მონაცემები წარმატებით განახლდა",
      });
      setUpldateComplete(true);
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: "მონაცემები ვერ განახლდა",
      });
    } finally {
      setLoading(false);
    }
  };

  if (updateComplete) {
    return <VerificationCodeInput email={formData.email} />;
  }

  return (
    <div
      className="min-h-screen bg-cover"
      style={{
        backgroundImage: `url(${SettingsIcon})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loading && <Loading />}
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-white">
          პარამეტრები
        </h1>
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                ელ-ფოსტა
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder={user?.email}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                პაროლი
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                სახელი
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder={user?.first_name}
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                გვარი
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder={user?.last_name}
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                განახლება
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
