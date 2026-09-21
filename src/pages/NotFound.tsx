import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-bg px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-accent">404</p>

        <h1 className="mt-4 text-2xl font-semibold text-primary-text">
          Page not found
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-secondary-text">
          The page you're looking for doesn't exist.
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}
