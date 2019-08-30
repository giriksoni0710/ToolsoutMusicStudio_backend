const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');



const app = express();

app.use(cors());


app.use(bodyparser.json());

const connectionString = {
    host: 'sql213.main-hosting.eu',
    database: 'u945305463_tools',
    user: 'u945305463_tools',
    password: 'Girik_soni'
}

const conn = mysql.createConnection(connectionString);

if(conn){
    console.log("connected to mysql!!!");
}
else{
    console.log("error");
}


//User booking a session

app.post('/abc', (req, res)=>{

console.log(req.body);


// storing user info in database 

conn.query(`INSERT INTO users SET name='${req.body.name}', email='${req.body.email}',
phone='${req.body.phone}', B_Date=${req.body.data} `, (err, res)=>{

    if(!err){

        console.log("inserted record");


    }

    else {

        console.log(err);
    }



})

//sending mail to the client 

var transporter = nodemailer.createTransport({
    
    host: 'smtp.hostinger.com',
    port: 587,
    auth: {
      user: 'info@toolsout.com',
      pass: 'Girik_soni'
    }
  });
   
  var mailOptions = {
    from: 'info@toolsout.com',
    to: `${req.body.email}`,
    subject: 'Thankyou for contacting Toolsout',
    // \n\xA0 is for a new-line to format the mail.
    text: `Hello ${req.body.name}, \n\xA0  \n\xA0 Thank you for contacting Toolsout. \n\xA0 
    
    Our experts will reach out to you within 2 hours. \n\xA0
    Thanks and Regards, \n\xA0
    Joel John \n\xA0
    Audio Engineer, \n\xA0
    Toolsout Music Studio` 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  // mail to joel about client details


 var transporter = nodemailer.createTransport({
    
    host: 'smtp.hostinger.com',
    port: 587,
    auth: {
      user: 'info@toolsout.com',
      pass: 'Girik_soni'
    }
  });
  
 var mailOptions = {
    from: 'info@toolsout.com',
    to: 'giriksoni0710@gmail.com, joeljohn.henry@gmail.com',
    subject: 'Client details for you',
    // \n\xA0 is for a new-line to format the mail.
    text: `Hello Joel, \n\xA0  \n\xA0 This is your client details. \n\xA0 \n\xA0
    
    name: ${req.body.name} \n\xA0
    email: ${req.body.email} \n\xA0
    Contact: ${req.body.phone}\n\xA0
    Booking-Date: ${req.body.data} \n\xA0
    Thanks and Regards \n\xA0
    Girik Soni
    
    `
    
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


})

 









app.listen(3000, ()=>{


    console.log("Server running!!!");

})