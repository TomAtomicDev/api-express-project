const { Client } = require("pg");

const getConnection = async () => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "tom",
    password: "admin123",
    database: "yardsale"
  });
  await client.connect();
  console.log("conection successful");

  return client;
};

module.exports = getConnection;
