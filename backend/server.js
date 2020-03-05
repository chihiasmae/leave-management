/**
 * @author MBE
 */
const app = require("./app");
const debug = require("debug")("node-angular");

const config = require('./config');

// demarrer le serveur avec la commande: npm run start:server
// si la commande echou ==> npm install -g nodemon

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(config.portServer || "3000");
app.set("port", port);

const http = require("http");
const server = http.createServer(app);

server.on("error", onError);
server.on("listening", onListening);
server.listen(port, () => console.log(`API running on localhost:${port}`));
