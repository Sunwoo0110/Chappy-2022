const app = require("./app.js");
const port = 4000;

const server = app.listen(port, () => {
    console.log("Express listening on port", port);
    console.log("http://localhost:"+port);
});