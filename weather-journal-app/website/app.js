/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=e94b0148b5fba7bce8cd4561df827587&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// get request from the weather web api
const getWeather = async (baseURL, zipCode, apiKey) => {

    const response = await fetch(baseURL + zipCode + apiKey)
    try {
        const data = await response.json();
        //console.log(data.main.temp);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// post request that post weather and user response data to the server
const postData = async ( url = '', data = {})=>{
    const response = await fetch( url , {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}

//update UI by retrieving all data from server
const updateUI = async () => {
    const response = await fetch('/all');
    try {
        const allData = await response.json();
        document.getElementById('temp').innerHTML = 'Temperature: '+ allData.temperature +' Celcius';
        document.getElementById('date').innerHTML = 'Date: '+allData.date;
        document.getElementById('content').innerHTML = 'User Response: '+allData.userResponse;

    } catch (error) {
        console.log("error", error);
    }
}


// action to perform when the button is clicked by getting weather data from the api and post it to the server with the user response then retrieve these data
// and update the html with it through a chained promisies
function generateOutput(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if(zipCode === "")
    {
        alert("Must Provide A Zip Code !");
    }
    else
    {
        getWeather(baseURL,zipCode,apiKey)
        .then(function(data){
            postData('/addData',{temperature:data.main.temp,date :newDate ,userResponse : feelings}).then(updateUI())
        })
    }
}

document.getElementById('generate').addEventListener('click', generateOutput);