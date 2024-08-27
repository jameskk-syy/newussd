// Import packages
const express = require("express");
const bodyParser = require("body-parser");
const firebaseApp = require('./config');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// establish firestore connection
const fireStoreDb = getFirestore(firebaseApp);

// establish collection connection
const collectionRef = collection(fireStoreDb, "USSD");

// Routes
app.use("/home", home);
app.post('/ussd', async (req, res) => {
  // We get this from users phone
  const { serviceCode, sessionId, phoneNumber, text } = req.body;

  // Create response
  let response = "";

  // First request
  if (text == "") {
    response = `CON What do you like to check:
    1 Create Record
    2 Update Record
    3 Read Record
    4 Delete Account`;
  } 
  else if (text == "1") {
    // Handle creating a record
   //  const data = await createRecord(phoneNumber); 
    response = `END you me`;
  } 
  else if (text == "2") {
    // Handle updating a record
  } 
  else if (text == "3") {
    // Handle reading a record
  } 
  else if (text == "4") {
    // Handle deleting a record
  }

  res.set('content-type', 'text/plain');
  res.send(response);
});

async function createRecord(phoneNumber) {
  // We will add our data here
  const data = {
    firstName: "James",
    lastName: "Maina",
    mobile: phoneNumber,
    amount: "0.00"
  };
  
  try {
    const result = await addDoc(collectionRef, data);
    console.log(`Your record is saved successfully with ID ${result.id}`);
    return `Your record added successfully`;
  } catch (err) {
    console.error(`Error: ${err}`);
    return `Failed to add your record`;
  }
}

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
