import { getUser } from "@gh/helper/encryption";

import Cors from "cors";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  origin: "*", // Replace with your allowed origin
  //   methods: ["GET", "POST"], // Replace with your allowed methods
  // allowedHeaders: ["Content-Type", "Authorization"], // Replace with your allowed headers
  allowedHeaders: "*", // Replace with your allowed headers
  //   credentials: true, // Replace with your desired credential setting
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req, res, fn = cors) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const withCors = (handler) => async (r, res) => {
  await runMiddleware(r, res, cors);
  return handler(r, res);
};

export default withCors;
