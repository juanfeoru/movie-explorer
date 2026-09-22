# Movie Explorer

A responsive movie discovery application built with React, TypeScript, and the TMDB API.

Movie Explorer allows users to explore popular movies, search for titles, filter movies by genre, view detailed information, and manage their favorite movies through a clean and responsive interface.

## Features

- Browse popular movies.
- Search for movies by title.
- Filter movies by genre.
- Sort search results.
- Pagination for movie searches.
- View detailed information about a movie.
- Add and remove movies from favorites.
- Favorites page with the number of saved movies.
- Responsive design for desktop, tablet, and mobile.
- Loading, error, and empty states.
- Accessible buttons, links, and keyboard focus states.
- Client-side routing with React Router.
- Movie data transformation through reusable utility functions.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### API

- TMDB API

### Development

- pnpm
- ESLint
- Git & GitHub

## Project Structure

```text
src/
├── api/
│   └── tmdb.ts
├── components/
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── MovieCard.tsx
│   │   └── MovieGrid.tsx
│   ├── layout/
│   │   └── Header.tsx
│   └── ui/
│       ├── EmptyState.tsx
│       ├── ErrorState.tsx
│       └── LoadingState.tsx
├── constants/
│   └── genres.ts
├── pages/
│   ├── Discover.tsx
│   ├── Favorites.tsx
│   ├── Home.tsx
│   ├── MovieDetails.tsx
│   └── NotFound.tsx
├── types/
│   └── movies.ts
├── utils/
│   └── movie.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- pnpm

### Installation

Clone the repository:

```bash
git clone https://github.com/juanfeoru/movie-explorer
```

Navigate to the project directory:

```bash
cd movie-explorer
```

Install the dependencies:

```bash
pnpm install
```

### Environment Variables

This project uses the TMDB API.

Create a `.env` file in the root of the project:

```env
VITE_TMDB_API_KEY=your_api_key
```

You can get an API key by creating an account on TMDB.

### Run the Development Server

```bash
pnpm dev
```

The application will be available at the local development URL provided by Vite.

### Build for Production

```bash
pnpm build
```

## Available Scripts

| Command      | Description                   |
| ------------ | ----------------------------- |
| `pnpm dev`   | Starts the development server |
| `pnpm build` | Creates a production build    |
| `pnpm lint`  | Runs ESLint                   |

## Application Pages

### Home

The home page contains the main hero section and a collection of popular movies.

### Discover

The Discover page allows users to search for movies, filter results by genre, sort them, and navigate through search results.

### Movie Details

Each movie has a dedicated details page containing additional information such as its overview, genres, rating, release year, and runtime when available.

### Favorites

Users can add movies to their favorites directly from movie cards and view all saved movies on the Favorites page.

## Design

The application uses a dark interface with a subtle red accent color.

The main design tokens include:

- Background: `#0b0b0d`
- Surface: `#151518`
- Surface hover: `#1e1e22`
- Primary text: `#f5f5f5`
- Secondary text: `#a1a1aa`
- Muted text: `#71717a`
- Accent: `#e85d5d`
- Border: `#27272a`

The interface was designed to remain usable and visually consistent across different screen sizes.

## Accessibility

Some accessibility considerations implemented in the project include:

- Semantic HTML elements.
- Descriptive `aria-label` attributes for interactive buttons.
- `aria-pressed` for the favorite button state.
- Visible keyboard focus styles.
- Keyboard-accessible navigation.
- Links used for navigation instead of clickable non-semantic elements.
- Decorative icons hidden from assistive technologies where appropriate.

## Architecture

The project separates responsibilities into different layers.

`api/` handles communication with the TMDB API.

`types/` contains TypeScript types used throughout the application.

`utils/` contains reusable functions for transforming and processing movie data.

`constants/` contains static application data such as movie genres.

`components/` contains reusable UI components.

`pages/` contains the application's route-level views.

This structure keeps API logic, data transformation, application logic, and presentation separated from each other.

## Data Flow

Movie data received from TMDB is transformed into the application's own `Movie` type before being used by the UI.

```text
TMDB API
   ↓
api/tmdb.ts
   ↓
utils/movie.ts
   ↓
Movie type
   ↓
Pages & Components
   ↓
User Interface
```

This approach allows the UI to work with a consistent data structure instead of depending directly on the API response format.

## What I Practiced

This project was built as a practical way to improve my React and TypeScript skills while working with an external API.

During development, I practiced:

- React component architecture.
- TypeScript interfaces and types.
- React Router and dynamic routes.
- API requests and asynchronous operations.
- State management with React hooks.
- Search and filtering.
- URL query parameters.
- Debounced search.
- Responsive UI development with Tailwind
