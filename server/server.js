const app = require("./app.js");
const port = 3000;

const server = app.listen(port, () => {
    console.log("Express listening on port", port);
    console.log("http://localhost:"+port);
});