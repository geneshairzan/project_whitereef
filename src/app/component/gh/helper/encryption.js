const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

async function hashing(raw, cycle = 5) {
  return await bcrypt.hash(raw, cycle);
}

async function check(raw, hashed) {
  return await bcrypt.compare(raw, hashed);
}

async function getToken(data) {
  var privateKey = fs.readFileSync("storage/key/private.pem");
  return jwt.sign(data, privateKey, { algorithm: "RS256", expiresIn: "24hr" });
}
function getSimpleToken(data) {
  return Math.floor(Math.random() * 9000 + 1000).toString();
}

async function checkToken(token) {
  if (!token) return null;
  var privateKey = fs.readFileSync("storage/key/private.pem");
  return jwt.verify(token, privateKey, { algorithm: "RS256" });
}

async function getUser(req) {
  let token = req.headers?.authorization?.split(" ")[1];
  try {
    return await checkToken(token);
  } catch (error) {
    return null;
  }
}

const enc = { hashing, check, getToken, checkToken };
export default enc;
export { checkToken, getUser, getSimpleToken };
