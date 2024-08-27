// Import packages
const express = require("express");
const bodyParser =  require('body-parser');
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// Routes
app.use("/home", home);
app.get('/ussd',(req,res)=>{
 res.status(200).send(req.method)
});
// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
