// Import packages
const express = require("express");
const bodyParser =  require('body-parser');
const firebaseApp = require('./config');
const {getFirestore,collection} = require('firebase/firestore');
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// establish  firestore  connection
const fireStoreDb = getFirestore(app);

//establish  collection connection

const collectionRef = collection(fireStoreDb,"USSD");


// Routes
app.use("/home", home);
app.post('/ussd',(req,res)=>{
// we get this from  users phone
 const {
    serviceCode,
    sessionId,
    phoneNumber,
    text
 } = req.body;

 //create response 
 let  response = "";

 //first request 
 if(text == ""){
    response = `CON What do you  like to  check
    1 Account Number
    2 Account Information`;
 }
 else if(text == "1"){
    // check  first level 
    const accountNumber = "0796598108"
    response = `END Your account number is ${accountNumber} and ${serviceCode}`;
 }
 else if(text == "2"){
    response = `CON What do  you like to  check  on  your account
    1 Phone Number
    2 Account Balance`;
 }
 else if(text == "2*1"){
    response =`END Your phone number is ${phoneNumber}`
 }
 else if(text == "2*2"){
    const accountBalance = "1000000"
    response =`END Your account balance is ${accountBalance}`
 }
 res.set('content-type:text/plain');
 res.send(response);
});
// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
