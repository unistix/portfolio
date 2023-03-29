require('dotenv').config()
const express = require("express");
const nodeMail = require("nodemailer");
const path = require("path");
const app = express();
//const router = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); //useful for adding static front end to full website


 app.use(bodyParser.json())
app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:3000", "*"],
  credentials: true
}))


  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }); //is this the answer it will be later?

 


const port = process.env.PORT || 8080;

async function mainMail(name, email, message) {
    const transporter = await nodeMail.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });
    const mailOption = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Potential Client - ${name}`,
      html: `You got a message from 
      Email : ${email}
      Name: ${name}
      Message: ${message}`,
    };
    try {
      await transporter.sendMail(mailOption);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
  }

//This is to attach basic  front end
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });

app.get('/contact',function(req,res){
    res.sendFile(path.join(__dirname+'/contact.html'));
    //__dirname : It will resolve to your project folder.
  });
  

  

  /*
    //This is to attach react front end
    app.use(express.static(path.join(__dirname, '/client-gpt/build')));


    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client-gpt/build', 'index.html'));
    });
  */
  
  app.post("/contact", async (req, res, next) => {
    const { name, email, message } = req.body;

    //await mainMail(name, email,  message);
    //console.log(req.body)
    
    try {
      await mainMail(name, email, message);
      console.log(req.body)
      
      //res.send(`Message Successfully Sent!  from ${yourname} about  ${yoursubject}`);
      res.json({message:`Message Successfully Sent! from ${name}`, success:true});
      console.log({message:`Message Successfully Sent! from ${name}`})
      
    } catch (error) {
      //res.send("Message Could not be Sent");
      console.log(error)
      res.json({message:"Message Could not be Sent", success:true});
      
    }
   
  });
  
  app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`));





//https://strapengine.com/contact-form-with-nodemailer-gmail-and-node-js/
// see app js version to set up form handling properly
//might be worth separating from and back end until final build for sanity.