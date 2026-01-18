const errorMiddleware = (req, res, err, next) => {
  try {
    const error = {...err};
    error.message = err.message;
    console.error(err);

  } catch (error) {
    next(error);
  }
}