import mongoose from "mongoose";

const movieEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    tmdbMovieId: {
      type: Number,
      required: true,
    },

    original_title: {
      type: String,
      required: true,
    },

    backdrop_path: {
      type: String,
    },

    poster_path: {
      type: String,
    },

    overview: {
      type: String,
    },

    original_language: {
      type: String,
    },

    release_date: {
      type: String,
    },

    status: {
      type: String,
      enum: ["planned", "watching", "completed"],
      default: "completed",
    },

    rating: {
      type: Number,
      min: 0,
      max: 10,
    },

    note: {
      type: String,
      trim: true,
      maxLength: 256,
    },

    watchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

movieEntrySchema.index({ userId: 1, tmdbMovieId: 1 }, { unique: true });

const MovieEntry = mongoose.model("MovieEntry", movieEntrySchema);

export default MovieEntry;
