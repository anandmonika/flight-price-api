require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require('morgan')
const priceRouter = require("./api/price/price.router");

app.use(express.json());
app.use(morgan('combined'))

app.use("/api", priceRouter);

app.use("/", function (req, res) {
    res.setHeader('Content-type','text/html')
    res.send(`<center><strong>Welcome to flight price tracker API</strong> <br /> <br />
    Go to this link to access the API: <a href="/api/price?source=BLR&destination=DEL&date=2023-06-07">BLR-DEL Flight Price</a></center>`)
})

app.listen(process.env.APP_PORT, ()=>{
    console.log("Server up and running on PORT:",process.env.APP_PORT);
})