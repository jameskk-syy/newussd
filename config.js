const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyBahqfD4SMTBJryC204kRAMqXlO71BcWZg",
  authDomain: "ussd-c061f.firebaseapp.com",
  projectId: "ussd-c061f",
  storageBucket: "ussd-c061f.appspot.com",
  messagingSenderId: "88205787802",
  appId: "1:88205787802:web:6bc441f17a100d96fe9523"
};


const app = initializeApp(firebaseConfig);
module.exports = app;