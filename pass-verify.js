const bcrypt = require("bcrypt");

async function verifyPassword() {
  const myPassword = "admin1.2.3";
  const hash = "$2b$10$1K6eHaIbp8871b/ngG8v0OSRZDGSGVYxpNjJXp6mnnlMowK7eA1tS";
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword(); // True
