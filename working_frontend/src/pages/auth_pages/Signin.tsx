import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonWithSpinner from "../../components/ButtonWithSpinner";
import LoadingOverlay from "../../components/LoadingOverlay";
import { login } from "../../utils/auth";
import { useToast } from "../../components/Toast";

export default function SigninPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate email and password before sending request
      if (!email || !password) {
        setError("Please enter both email and password");
        addToast("Please enter both email and password", "error");
        setLoading(false);
        return;
      }

      // Call the login function from auth.ts
      await login(email, password);
      addToast("Login Successful", "success");
      setLoading(false);
      // Note: The login function now handles redirection
    } catch (err) {
      // Handle login errors
      setError(err instanceof Error ? err.message : "Login failed");
      addToast("Login Failed", "error");
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={loading} message="Signing you in..." />

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200">
          <div className="p-8">
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-purple-700">
              Welcome back
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-medium text-purple-600 hover:text-purple-500"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <ButtonWithSpinner
                  type="submit"
                  isLoading={loading}
                  variant="solid"
                  loadingMessage="Signing in..."
                >
                  Sign in
                </ButtonWithSpinner>
              </div>
            </form>
          </div>

          <div className="bg-purple-50 px-8 py-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}