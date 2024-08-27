const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyCZVxRm-IjENRLwOrEXjPzqzzjHJN6tj5s",
  authDomain: "ussd-e3d97.firebaseapp.com",
  projectId: "ussd-e3d97",
  storageBucket: "ussd-e3d97.appspot.com",
  messagingSenderId: "341410562636",
  appId: "1:341410562636:web:d20fb07341257aeae46ae9"
};


const app = initializeApp(firebaseConfig);
module.exports = app;