import { ErrorRequestHandler } from "express";
import config from "../config";

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  console.log("***************Error Caught***************");
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  return res.status(500).json({
    message: config.nodeEnv === "production" ? "unknown error" : `${err}`,
  });
};

export default errorHandler;
