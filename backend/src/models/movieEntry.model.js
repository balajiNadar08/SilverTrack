import mongoose from "mongoose";

const movieEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  tmdbMovieId: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["planned", "watching", "completed"],
    default: "completed"
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: 0,
    max: 10
  },
  note: {
    type: String,
    trim: true,
    maxLength: 256, 
  },
  watchedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamp: true });

const MovieEntryModel = mongoose.model("MovieEntry", movieEntrySchema);

export default MovieEntryModel;