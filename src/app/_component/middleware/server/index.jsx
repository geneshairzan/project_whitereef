import auth from "./auth";
import header from "./header";

const middlewareChain = (handler) => async (req, res) => {
  // Compose middleware functions in the desired order
  // res.setHeader("Access-Control-Allow-Origin", "*");

  return header(auth(handler))(req, res);
};

// export default serverMiddleware;
export default middlewareChain;
