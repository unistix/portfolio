require('dotenv').config()
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.static("public"));
app.use(express.json());


const port = process.env.PORT || 3000;
const user = "your gmail id";
const pass = "your gmail password";

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/contactform.html")
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`);
});

//https://strapengine.com/contact-form-with-nodemailer-gmail-and-node-js/
// see app js version to set up form handling properly
//might be worth separating from and back end until final build for sanity.