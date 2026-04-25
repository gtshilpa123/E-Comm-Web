// promise based syntax which Node.js provides in FS.
// fs has an object named promises, which allows to create and write data into files asynchronously without using callbacks.
// fs is core module of Node.js
// npm i winston -> used to log requests

import fs from "fs";
import winston from "winston";

const fsPromise = fs.promises;

// async function log(logData) {
//   try {
//     logData = `\n ${new Date().toString()} - ${logData}`;
//     await fsPromise.appendFile("log.txt", logData);
//     // writeFile will override previously written content. appendFile will append new data along with previous content.
//   } catch (error) {
//     console.error(error);
//   }
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "logs.txt" })], // transports splecifies where to log whether on console or file or etc.
  defaultMeta: { service: "request-logging" },
  // meta data specifies what kind of logging it is
});

const loggerMiddleware = async (req, res, next) => {
  // 1. log request body
  if (!req.url.includes("signin")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`; // req.body is object. Convert it into string. req.url is already a string.
    logger.info(logData);
    // await log(logData);
  }
  next();
};

export default loggerMiddleware;

// winston logger library is used to log requests in Node.js and express applications.
// level is minimum level of log which you want to have. error - 0, warn - 1, info - 2, http - 3, etc.
