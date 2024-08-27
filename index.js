// Import packages
const express = require("express");
const bodyParser =  require('body-parser');
const firebaseApp = require('./config');
const {getFirestore,collection,addDoc,onSnapshot, getDocs} = require('firebase/firestore');
const home = require("./routes/home");
const cors = require('cors');

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
// app.use(cors);

// establish  firestore  connection
const fireStoreDb = getFirestore(app);

//establish  collection connection

const collectionRef = collection(fireStoreDb,"USSD");

// Routes
app.use("/home", home);
app.post('/ussd',async(req,res)=>{
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
    1 Create Record
    2 Update Record
    3 Read Record
    4 Delete Account`;
 }
 else if(text == "1"){
   //check  first level   
   const data = await createRecord(phoneNumber);
   response = `END ${data}`; 
 }
 else if(text == "2"){
   response = `END updated`; 
 }
 else if(text == "3"){
   const result = await getRecord();
   if (result.length > 0) {
      response = "END Here are all the records:\n";
   result.forEach((record, index) => {
          response += `${index + 1}. ${record.firstName} ${record.lastName}\nPhone: ${record.mobile}\n\n`;
      });
  } else {
      response = "END No records found.";
  }
 }
 else if(text == "4"){
   response = `END deleted`; 

 }
 res.set('content-type:text/plain');
 res.send(response);
});
async function createRecord(phoneNumber) {
   // Data to be added to Firestore
   const data = {
     firstName: "James",
     lastName: "Maina",
     mobile: phoneNumber,
     amount: "0.00"
   };
 
   try {
     // Add document to Firestore collection
     const docRef = await addDoc(collectionRef, data);
 
     // Return success message
     return `Your record with phone number ${phoneNumber} added successfully with ID ${docRef.id}`;
   } catch (err) {
     // Log error and return failure message
     console.error("Error adding document:", err);
     return `Error adding record: ${err.message}`;
   }
 }
async function getRecord(phoneNumber) {
   // Retrieve data from  firestore
   try {
     // Add document to Firestore collection
     let data = [];
     const result = await getDocs(collectionRef);
     result.docs.forEach((doc)=>{
      data.push({...doc.data(), id:doc.id})
     })
     // Return success message
     return data;
   } catch (err) {
     // Log error and return failure message
     console.error("Error adding document:", err);
     return `Error adding record: ${err.message}`;
   }
 }
 
app.get('/create',async(req,res)=>{
   try {
      const data = await getRecord();
      res.status(200).send(data);
   } catch (error) {
      res.status(500).send(error);
       
   }
 
})


// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
