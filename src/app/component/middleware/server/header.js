const header = (handler) => async (r, res) => {
  let request_buffer = r;
  // request_buffer.header = {
  //   ...request_buffer.header,
  //   "data-signature": "gip",
  //   "Access-Control-Allow-Credentials": true,
  // };

  return handler(request_buffer, res);
};

export default header;
