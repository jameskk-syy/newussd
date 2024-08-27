// Import packages
const express = require("express");
const bodyParser =  require('body-parser');
const firebaseApp = require('./config');
const {getFirestore,collection,addDoc} = require('firebase/firestore');
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
 let data = "";

 //first request 
 if(text == ""){
    response = `CON What do you  like to  check
    1 Create Record
    2 Update Record
    3 Read Record
    4 Delete Account`;
 }
 else if(text == "1"){
   //check  first level   
   const data = createRecord();
   response = `END ${data}`; 
 }
 else if(text == "2"){
   response = `END updated`; 
 }
 else if(text == "3"){
   response = `END viewed`; 
 }
 else if(text == "4"){
   response = `END deleted`; 

 }
 res.set('content-type:text/plain');
 res.send(response);
});
function createRecord(){
   //we will add our data here
return response = ` your record added successfully`;
}


// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
