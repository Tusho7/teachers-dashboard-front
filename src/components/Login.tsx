import { FormEvent, useState } from "react";
import { adminLogin } from "../services/Login";
import { useNavigate, Link } from "react-router-dom";
import { getUser } from "../services/api/getUser";
import { useUser } from "../contexts/useUser";
import Loading from "./Loading";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const email = target.username.value;
    const password = target.password.value;

    try {
      await adminLogin(email, password);
      localStorage.setItem("isLogin", "true");
      const { data } = await getUser();
      setUser(data);
      navigate("/admin_dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {loading && <Loading />}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          შესვლა
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="username" className="sr-only">
              ელ-ფოსტა
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
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
              autoComplete="current-password"
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="პაროლი"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            შესვლა
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            ახალი ანგარიშის შექმნა
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
