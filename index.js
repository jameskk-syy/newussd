// Import packages
const express = require("express");
const bodyParser = require("body-parser");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const home = require("./routes/home");

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const fireStoreDb = getFirestore(firebaseApp);

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// establish collection reference
const collectionRef = collection(fireStoreDb, "USSD");

// Routes
app.use("/home", home);

// USSD handler route
app.post('/ussd', async (req, res) => {
  // Extract parameters from the request
  const { serviceCode, sessionId, phoneNumber, text } = req.body;

  // Initialize the response
  let response = "";

  // Handle USSD logic
  if (text === "") {
    response = `CON What do you like to check:
    1 Create Record
    2 Update Record
    3 Read Record
    4 Delete Account`;
  } else if (text === "1") {
    // Create record for option 1
    const data = await createRecord(phoneNumber);
    response = `END ${data}`;
  } else if (text === "2") {
    // Update record logic (can be implemented later)
    response = `END update`;
  } else if (text === "3") {
    // Read record logic (can be implemented later)
    response = `END view data`;
  } else if (text === "4") {
    // Delete record logic (can be implemented later)
    response = `END delete`;
  }

  // Send response as plain text
  res.set('Content-Type', 'text/plain');
  res.send(response);
});

// Function to create a record in Firestore
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
    console.log(`Document saved with ID: ${docRef.id}`);
    return `Record added successfully with ID: ${docRef.id}`;
  } catch (error) {
    // Log and return error message
    console.error(`Error adding document: ${error}`);
    return `Error adding record: ${error.message}`;
  }
}

// Start the server
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Server running on port ${port}`));
