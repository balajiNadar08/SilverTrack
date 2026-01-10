import MovieEntry from "../models/movieEntry.model.js";

//* GET: /movies/
export const getAllMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const userMovies = await MovieEntry.findById({ user_id: userId });

    res.status(200).json({
      success: true,
      count: userMovies.length,
      data: userMovies,
    });
  } catch (error) {
    console.error("Error fetchcing movies: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch movies",
    });
  }
};


//* GET: /movies/:id
export const getSpecificMovie = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const movie = await MovieEntry.findOne({
      _id: id,
      user_id: userId,
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error("Error fetchcing movie: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch movie",
    });
  }
};


//* POST: /movies/
export const addMovie = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tmdb_movie_id, status, rating, note, watchedAt } = req.body;

    if (!tmdb_movie_id) {
      return res.status(400).json({
        success: false,
        message: "tmdb_movie_id is required",
      });
    }

    const existingEntry = await MovieEntry.findOne({
      user_id: userId,
      tmdb_movie_id,
    });

    if (existingEntry) {
      return res.status(409).json({
        success: false,
        message: "Movie already added",
      });
    }

    const movieEntry = await MovieEntry.create({
      user_id: userId,
      tmdb_movie_id,
      status,
      rating,
      note,
      watchedAt,
    });

    res.status(201).json({
      success: true,
      data: movieEntry,
    });

  } catch (error) {
    console.error("Error in adding movie: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to add movie",
    });
  }
};
