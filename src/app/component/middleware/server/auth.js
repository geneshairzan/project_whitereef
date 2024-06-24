import { getUser } from "@gh/helper/encryption";
import { runMiddleware } from "./withCors";

const auth = (handler) => async (r, res) => {
  await runMiddleware(r, res);
  let request_buffer = r;
  request_buffer.auth = await getUser(r);

  return handler(request_buffer, res);
  // return withCors(handler(request_buffer, res));
};

export default auth;
