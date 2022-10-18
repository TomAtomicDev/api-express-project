const jwt = require("jsonwebtoken");

const secret = "myCat";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2NTc4NTIyOH0.VoCK6qSL9OFurrRt6iMAUBizQxcmD11UvwqdVhONXUA";

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
