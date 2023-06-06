require("dotenv").config();
const express = require("express");
const app = express();
const priceRouter = require("./api/price/price.router");

app.use(express.json());

app.use("/api", priceRouter);

app.listen(process.env.APP_PORT, ()=>{
    console.log("Server up and running on PORT:",process.env.APP_PORT);
})