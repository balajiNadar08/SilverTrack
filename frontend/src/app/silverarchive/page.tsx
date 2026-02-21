import { useState } from "react";

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

  return (
    <div>
      <h1>SilverArchive</h1>
    </div>
  );
};

export default page;
