import { useEffect, useState } from "react";

type Movie = {
  id: number;
  original_title: string;
  overview: string;
  original_language: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
};

const page = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);

      try {
        const res = await fetch(`http://localhost:8000/movies`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setMovies([...data]);
      } catch (error) {
        console.log("Could not get all movies. Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>SilverArchive</h1>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null;

        return (
          <div key={movie.id}>
            <h2>{movie.original_title}</h2>
            {posterUrl && <img src={posterUrl} alt={movie.original_title} />}
          </div>
        );
      })}
    </div>
  );
};

export default page;
