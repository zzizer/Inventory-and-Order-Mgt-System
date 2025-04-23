import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonWithSpinner from "../../components/ButtonWithSpinner";
import LoadingOverlay from "../../components/LoadingOverlay";
import { register } from "../../utils/auth";
import { useToast } from "../../components/Toast";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate inputs
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      addToast("Passwords do not match", "error");
      setLoading(false);
      return;
    }

    try {
      // Call the register function from auth.ts
      await register(email, username, phoneNumber, password);

      // If registration is successful, the function will handle redirection
      // If you want additional handling, you can add it here
    } catch (err) {
      // Handle registration errors
      setError(err instanceof Error ? err.message : "Registration failed");
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={loading} message="Creating your account..." />

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-200">
          <div className="p-8">
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-purple-700">
              Create an Account
            </h2>

            {/* Error message display
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                {error}
              </div>
            )} */}

            <form onSubmit={handleSignup} className="space-y-6">
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
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="+1 (123) 456-7890"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Create a strong password"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Repeat your password"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <ButtonWithSpinner
                  type="submit"
                  isLoading={loading}
                  variant="solid"
                  loadingMessage="Creating Account..."
                >
                  Sign Up
                </ButtonWithSpinner>
              </div>
            </form>
          </div>

          <div className="bg-purple-50 px-8 py-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/")}
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}