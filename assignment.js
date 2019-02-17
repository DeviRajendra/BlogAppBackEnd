/*
Create an Express application that has following routes and runs on port 3000 - 
Route 1 - GET  /split/name - which takes fullName as query parameter and gives firstName and
 lastName as output. 
Sample input - /split/name?fullName=Aditya Kumar
Output - {
	“firstName”:”Aditya”,
	“lastName”:”Kumar”
}
 Route 2 - /calculate/age - which takes date of birth in format yyyy-mm-dd and 
return the age of the person. 
Sample input - /calculate/age?dob=1992-02-28
Output - {
	“age”:26
}

NOTE: You are not required to use app.listen(<port>). This will be handled by the system.

*/


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/split/name', (req, res) => {
    let fullName = req.query.fullName;
    let fullArray = fullName.split(" ");
    let objectArray = {
        "firstName":fullArray[0],
        "lastName":fullArray[1]
    };
    res.send(objectArray);
    
});// end split name

app.get('/calculate/age', (req, res) => {

    let dob = req.query.dob;
    let dobArray = dob.split("-");
    let dYear = Number(dobArray[0]);
	let dMonth = Number(dobArray[1]);
    
    let today = new Date();
    let m = today.getMonth()+1;
    let y = today.getYear();
    let age = dYear-y;

    if(dMonth>m){
        age=age-1;

    }

    let ageObj={"age":age};
    res.send(ageObj);







});// end calculate age

module.exports = app;