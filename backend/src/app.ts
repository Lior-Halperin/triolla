import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./2-utils/config";
import dal from "./2-utils/dal";
import catchAll from "./3-middleware/catch-all";
import { RouteNotFoundError } from "./4-models/error-models";
import eventController from "./6-controllers/event-controllers";

const expressServer = express();

//  Backend approval to browse AJAX to backend API
if (process.env.NODE_ENV === "development") expressServer.use(cors());

expressServer.use(express.json());

expressServer.use("/api", eventController);

//Route not found
expressServer.use(
  "*",
  (request: Request, response: Response, next: NextFunction) => {
    next(new RouteNotFoundError(request.method, request.originalUrl));
  }
);

expressServer.use(catchAll);

expressServer.listen(config.serverPort, () => {
  try {
    console.log(`Listening on http://localhost:${config.serverPort}`);
    dal.connect(); // Connect once to MongoDB.
  } catch (err: any) {
    console.log("Error connecting to database:", err);
  }
});
