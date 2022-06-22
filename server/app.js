const express = require("express");
const bodyParser = require("body-parser");

class App {
    constructor() {
        this.app = express();

        //미들웨어
        // this.setMiddleWare();

        // 라우팅
        this.getRouting();

        // // 404 error
        this.status404();

        // // 에러처리
        this.errorHandler();

    }

    // dbConnection() {
    //     // DB authentication
    //     require('./routes');
    //   }

    getRouting() {
        this.app.use(require("./routes"));
    }

    status404() {
        this.app.use((req, res, _) => {
            res.status(404).json("error","404");
        });
    }

    errorHandler() {
        this.app.use((err, req, res, _) => {
            res.status(500).json("error","500");
        });
    }

}



module.exports = new App().app;