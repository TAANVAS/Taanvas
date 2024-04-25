Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {
    if (!currentUser.get("IsCommittee")) {
        alert("You are not logged in as a Committee Member.")
        location.href = '../index.html'
    }
} else {
    alert("You are not logged in.")
    location.href = '../login.html';
    console.log("NOT LOGGED IN!")
}

var Users = Parse.Object.extend("User");
var Reports = Parse.Object.extend("Report");
var Courses = Parse.Object.extend("Course");
var Applications = Parse.Object.extend("Application");


var loading = false

var event = new Event('input');


// Code to execute whenever input is changed
var table = document.getElementById('pendingTable')


//table.innerHTML = ''


appQuery = new Parse.Query(Applications);
let statusValues = [-2,3];

// Create a query for objects where the "Status" field is in the statusValues array
appQuery.containedIn("Status", statusValues)
appQuery.include("User");
const tableBody = document.querySelector('#applicationTable tbody');
appQuery.find().then(function(results) {
    // Loop through each object in the results array
    results.forEach(function(result) {
        //define constants for each object that you want to get
        var user = result.get("User")
        const studentName = user.get('username');
        const studentZNumber = user.get("Znumber")
        
        const courseName = result.get('AcceptedCourse');
        var accepted = result.get("Status")
        if (accepted == -2) {
            accepted = "Accepted by Student"
        } else {
            accepted = "Declined by Student"
        }

        const row = document.createElement('tr');



        row.innerHTML = `
                <td class="py-2 px-4 border-b border-gray-300 text-center">${studentName}</td>
                <td class="py-2 px-4 border-b border-gray-300 text-center">${studentZNumber}</td>
                <td class="py-2 px-4 border-b border-gray-300 text-center">${courseName}</td>
                <td class="py-2 px-4 border-b border-gray-300 text-center">${accepted}</td>
            `;
        tableBody.appendChild(row);
    });
});

/*Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {
    if (!currentUser.get("IsApplicant")) {
        alert("You are not logged in as a TA Applicant.")
        location.href = '../index.html'
    }
} else {
    alert("You are not logged in.")
    location.href = '../login.html';
    console.log("NOT LOGGED IN!")
}

if (currentUser) {    
    const Course = Parse.Object.extend("Course");
    const query = new Parse.Query(Course);
    // all applications are stored in the 'results' array
    const tableBody = document.querySelector('#applicationTable tbody');

    query.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
            const object = results[i];
            console.log(object.toJSON()); // Print the object to console
            // Process the object data as needed
        }
        console.log("All objects have been loaded.");
        results.forEach((object) => {
            //define constants for each object that you want to get
            const classCourse = object.get('Name');
            const courseID = object.get('CourseID');
            const CRN = object.get('CRN');
            const Status = object.get('Response');

            console.log(object);
            const row = document.createElement('tr');

                

            row.innerHTML = `
                    <td class="py-2 px-4 border-b border-gray-300 text-center">${classCourse}</td>
                    <td class="py-2 px-4 border-b border-gray-300 text-center">${courseID}</td>
                    <td class="py-2 px-4 border-b border-gray-300 text-center">${CRN}</td>
                    <td class="py-2 px-4 border-b border-gray-300 text-center">${Status}</td>
                `;
            tableBody.appendChild(row);
            
            //create new rows in the table for each object
        });
    }).catch((error) => {
        console.error("Error fetching Application objects: " + error.message);
    });

} else {
    //location.href = 'login.html';
    console.log("NOT LOGGED IN!")
}


console.log("Script has been loaded");*/