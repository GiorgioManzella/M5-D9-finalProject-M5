import fs from "fs-extra";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../Data");
const moviesPath = join(dataFolderPath, "../Data/media.json");

export const getMovies = () => readJSON(moviesPath);
export const writeMovies = (content) => writeJSON(moviesPath, content);
