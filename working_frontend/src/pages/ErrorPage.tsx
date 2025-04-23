import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 p-4 text-center">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white px-6 py-16 shadow-2xl ring-1 ring-gray-200 sm:p-20">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 text-purple-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-purple-700 sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 text-base text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/applicant_dashboard")}
            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Go home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-lg border border-purple-600 bg-white px-5 py-3 text-sm font-semibold text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}