//SERVER SETUP
const http = require("http");
const app = require("./index");
//create a port
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server started at port ${port}`));
