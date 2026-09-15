import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/search" element={<h1>Search</h1>} />
      <Route path="/movie/:id" element={<h1>Movie Details</h1>} />
      <Route path="/favorites" element={<h1>Favorites</h1>} />
    </Routes>
  );
}

export default App;
