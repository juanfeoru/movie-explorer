const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.TMDB_TOKEN;

export async function GET(request: Request) {
  const url = new URL(request.url);

  const type = url.searchParams.get("type");
  const query = url.searchParams.get("query");
  const page = url.searchParams.get("page") ?? "1";
  const id = url.searchParams.get("id");

  let endpoint = "/movie/popular";

  if (type === "search" && query) {
    endpoint = `/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
  }

  if (type === "details" && id) {
    endpoint = `/movie/${id}`;
  }

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.text();

    console.log("TMDB status:", response.status);
    console.log("TMDB error:", error);

    return Response.json(
      { error: "Failed to fetch movies" },
      { status: response.status },
    );
  }

  const data = await response.json();

  return Response.json(data);
}
