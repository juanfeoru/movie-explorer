import { useState } from "react";
import { NavLink } from "react-router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative h-16 border-b border-border bg-bg">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-6 text-accent"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 9h18" />
            <path d="m7 5 2 4" />
            <path d="m12 5 2 4" />
            <path d="m17 5 2 4" />
          </svg>

          <span className="text-xl font-bold text-primary-text">
            Movie Explorer
          </span>
        </NavLink>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary-text after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-accent"
                    : "text-secondary-text hover:text-primary-text"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/discover"
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary-text after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-accent"
                    : "text-secondary-text hover:text-primary-text"
                }`
              }
            >
              Discover
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary-text after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-accent"
                    : "text-secondary-text hover:text-primary-text"
                }`
              }
            >
              Favorites
            </NavLink>
          </div>
        </nav>

        <div className="ml-auto hidden md:flex">
          <button type="button" className="cursor-pointer" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-secondary-text transition-colors hover:text-primary-text"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="ml-auto cursor-pointer md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-secondary-text"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-secondary-text"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-16 z-50 w-full border-b border-border bg-surface md:hidden">
          <nav className="flex flex-col px-6 py-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `border-b border-border py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary-text"
                    : "text-secondary-text hover:text-primary-text"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/discover"
              className={({ isActive }) =>
                `border-b border-border py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary-text"
                    : "text-secondary-text hover:text-primary-text"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Discover
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `border-b border-border py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary-text"
                    : "text-secondary-text hover:text-primary-text"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Favorites
            </NavLink>

            <button
              type="button"
              className="flex items-center gap-3 py-3 text-left text-sm font-medium text-secondary-text transition-colors hover:text-primary-text"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
              Search
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
