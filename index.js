// import the server and start it!

const server = require('./api/server')

server.listen(9000, () => {
  console.log("server listening on 9000");
});
