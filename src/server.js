import express from "express";
import mediasRoute from "../src/media/index.js";
import listEndpoints from "express-list-endpoints";

const port = 3001;

//middlewares
const server = express();
server.use(express.json());

//endpoints

server.use("/media", mediasRoute);

//error middlewares

server.listen(port, () => {
  console.log(listEndpoints(server));
  console.log("Server running on specified port" + port);
});
