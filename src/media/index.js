import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { getMovies, writeMovies } from "../lib/fs-tools.js";
import uniqId from "uniqId";
import createError from "http-errors";

const mediasRouter = express.Router();

const mediasPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../Data/media.json"
);

//post request to Media------------------------------------------------------------------------------------------

mediasRouter.post("/", async (req, res, next) => {
  try {
    const newMovie = {
      ...req.body,
      id: uniqId(),
      createAt: new Date(),
    };
    console.log(`New Movie  has been created`);

    const moviesArray = await getMovies();

    moviesArray.push(newMovie);
    writeMovies(moviesArray);

    res.status(201).send(` has been added`);
  } catch (error) {
    next(error);
  }
});

//post review with id

mediasRouter.post("/Poster", async (req, res, next) => {
  try {
    const newReview = {
      ...req.body,
      updatedAt: new Date(),
      id: uniqId(),
    };
    const moviesArray = await getMovies();
    const selectedMovies = moviesArray.find(
      (element) => element.id === req.params.moviesId
    );
    asd;
    const modifiedMovie = selectedMovies.assign(newReview);

    res.status(201).send(modifiedMovie);
  } catch (error) {
    next(error);
  }
});

// get media list------------------------------------------------------------------------------------------

mediasRouter.get("/", async (req, res, next) => {
  try {
    const movies = await getMovies();
    res.send(movies);
  } catch (error) {
    next(error);
  }
});

export default mediasRouter;

// get specific media with id and (single) with review------------------------------------------

mediasRouter.get("/:moviesId", async (req, res, next) => {
  try {
    const moviesArray = await getMovies();
    const selectedMovies = moviesArray.find(
      (element) => element.id === req.params.moviesId
    );
    console.log(selectedMovies);
    if (selectedMovies) {
      res.status(200).send(selectedMovies);
    } else {
      next(createError(404), "Movie not found");
    }
  } catch (error) {}
});

// update media------------------------------------------------------------------------------------------

mediasRouter.put("/:moviesId", async (req, res, next) => {
  try {
    const movies = await getMovies();
    const index = movies.findIndex((movie) => movie.Id === req.params.moviesId);

    if (index !== -1) {
      const oldMovie = movies[index];
      const updatedMovie = { ...oldMovie, ...req.body, updated: new Date() };
      movies[index] = updatedMovie;
      await writeMovies(movies);
      res.send(updatedMovie);
    } else {
      next(createError(404), `movie not found`);
    }
  } catch (error) {}
});

// delete media files

mediasRouter.delete("/:moviesId", async function (req, res, next) {
  try {
    const movies = await getMovies();
    const remaningMovies = movies.filter(
      (book) => book.id !== req.params.moviesId
    );
    await writeMovies(remaningMovies);
    res.status(204).send("movie deleted successfully");
  } catch (error) {
    next(error);
  }
});
