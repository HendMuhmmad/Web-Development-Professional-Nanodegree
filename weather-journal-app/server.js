// Setup empty JS object to act as endpoint for all routes
projectData = {temperature:"",
date:"",
userResponse:""};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

//create a GET route
app.get('/all', function (request, response) {
    response.send(projectData);
  });

// create a POST route
app.post('/addData', function (request, response) {
    let data = request.body;
    projectData.temperature =  data.temperature;
    projectData.date =  data.date;
    projectData.userResponse = data.userResponse;
    response.send(projectData)
  });
