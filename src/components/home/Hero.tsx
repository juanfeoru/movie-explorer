import { useState } from "react";
import { useNavigate } from "react-router";

export default function Hero() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (!search.trim()) return;

    const encodedSearch = encodeURIComponent(search.trim());

    navigate({
      pathname: "/discover",
      search: `?search=${encodedSearch}`,
    });
  }

  return (
    <section className="px-6 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">
          Discover your next
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-text sm:text-5xl lg:text-6xl">
          Find your next movie
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-primary-text sm:text-lg">
          Explore movies, discover new favorites, and find something worth
          watching.
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl">
          <div className="flex w-full items-center rounded-xl border border-border bg-surface p-1.5 shadow-sm">
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for a movie..."
                className="w-full flex-1 bg-transparent px-4 py-3 pl-11 text-sm text-primary-text outline-none placeholder:text-muted-text"
              />
            </div>

            <button
              onClick={handleSearch}
              className="rounded-lg bg-accent px-5 py-3 text-sm font-medium text-primary-text transition hover:opacity-90 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-text">
          Search by title, actor of genre
        </p>
      </div>
    </section>
  );
}
