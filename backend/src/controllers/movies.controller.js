import MovieEntry from "../models/movieEntry.model.js";
import { searchMovie } from "../services/tmdb.service.js";


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


//* PUT: /movies/:id
export const editMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { status, rating, note, watchedAt } = req.body;

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (rating !== undefined) updateData.rating = rating;
    if (note !== undefined) updateData.note = note;
    if (watchedAt !== undefined) updateData.watchedAt = watchedAt;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const updatedMovie = await MovieEntry.findOneAndUpdate(
      { _id: id, user_id: userId },
      updateData,
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedMovie,
    });

  } catch (error) {
    console.error("Failed to edit movie details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to edit movie",
    });
  }
};


//* DELETE: /movies/:id
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedMovie = await MovieEntry.findOneAndDelete({
      _id: id,
      user_id: userId,
    });

    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });

  } catch (error) {
    console.error("Failed to delete movie:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete movie",
    });
  }
};



//* searchMoviesController for input bar
export const searchMoviesController = async (req, res) => {
  try {
    const { q } = req.query;

    const movies = await searchMovie(q);

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
