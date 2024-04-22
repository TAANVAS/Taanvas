//Status 0: Department Staff Recommendations
//Status 1: Committee Staff
//Status 2: Committee Accepted
//Status 3: Student Accepted
//Status -1: Committee Denied
//Status -2: Student Denied


Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {

} else {
    //location.href = 'login.html';
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

var firstResult = currentUser

console.log(firstResult)
console.log(firstResult.get("username"));

appQuery = new Parse.Query(Applications);
let statusValues = [0, 1];

// Create a query for objects where the "Status" field is in the statusValues array
appQuery.containedIn("Status", statusValues)
.equalTo("User", currentUser)



appQuery.find().then(function(results) {
    // Loop through each object in the results array
    results.forEach(function(result) {
        console.log("well, we got this far...")
        // Object with the specific ZNumber found
        console.log(firstResult.getUsername());

        // Find the first row and clone it
        var firstRow = document.getElementById('firstRow');
        console.log(firstRow)
        var newRow = firstRow.cloneNode(true); // true to clone all descendants as well

        // Get all the cells in the cloned row
        var cells = newRow.querySelectorAll('td');



        // Fill each cell with corresponding data
        cells[0].textContent = firstResult.get("username")

        if (result.get("createdAt")) {
            var formattedDate = result.get("createdAt").toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
            cells[1].textContent = formattedDate;
        }

        if (result.get("QualifiedCourses")) {
            cells[2].textContent = result.get("QualifiedCourses").join(", ");
        }
        
        if (result.get("RelevantCourses")) {
            cells[4].textContent = result.get("RelevantCourses")
        }

        cells[3].textContent = result.get("PreviousTA").toUpperCase()
        cells[5].textContent = "Pending"


 

        // Make the cloned row visible
        newRow.removeAttribute('hidden');

        // Append the cloned row to the table's tbody
        var tbody = document.querySelector('#pendingTable tbody');
        tbody.appendChild(newRow);
    });
});

let statusValues2 = [-2,-1,2,3];
appQuery = new Parse.Query(Applications);
appQuery.descending("Status");
// Create a query for objects where the "Status" field is in the statusValues array
appQuery.containedIn("Status", statusValues2)
.equalTo("User", currentUser)

const statusDictionary = {
    0: "Department Staff Recommendations",
    1: "Committee Staff",
    2: "Committee Accepted",
    3: "Student Accepted",
    "-1": "Committee Denied",
    "-2": "Student Denied"
};

appQuery.find().then(function(results) {
    // Loop through each object in the results array
    results.forEach(function(result) {
        console.log("well, we got this far...")
        // Object with the specific ZNumber found
        console.log(firstResult.getUsername());

        // Find the first row and clone it
        var firstRow = document.getElementById('firstRow2');
        var newRow = firstRow.cloneNode(true); // true to clone all descendants as well

        // Get all the cells in the cloned row
        var cells = newRow.querySelectorAll('td');



        // Fill each cell with corresponding data
        cells[0].textContent = firstResult.get("username")

        if (result.get("createdAt")) {
            var formattedDate = result.get("createdAt").toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
            cells[1].textContent = formattedDate;
        }

        if (result.get("QualifiedCourses")) {
            cells[2].textContent = result.get("QualifiedCourses").join(", ");
        }
        
        if (result.get("RelevantCourses")) {
            cells[4].textContent = result.get("RelevantCourses")
        }

        cells[3].textContent = result.get("PreviousTA").toUpperCase()
        
        if (result.get("Status") == 2) {

            // Assuming indexing starts from 0, cell 8 is at index 8
            var cell5 = cells[5];
            
            

            // Get all the buttons within cell 8
            
            cells[5].innerHTML = result.get("AcceptedCourse") + "<br>" + cells[5].innerHTML
            var buttonsInCell5 = cell5.querySelectorAll('button');
            console.log(buttonsInCell5)
            // Attach event listener for the first button
            buttonsInCell5[0].addEventListener('click', function() {
                // Event handling code for the first button
                console.log('Pass To Committee');

                //Status 1 == pass to committee
                result.set("Status", 3);

                // Save the updated object
                result.save().then(function(updatedResult) {
                    // Handle success if needed
                    console.log("Status updated successfully for object with ID: ", updatedResult.id);
                }).catch(function(error) {
                    // Handle error
                    console.error("Error updating status for object with ID: ", result.id, ", Error: ", error);
                });
                alert("Accepted by Student")
                location.reload();

            });

            // Attach event listener for the second button
            buttonsInCell5[1].addEventListener('click', function() {
                // Event handling code for the second button
                console.log('Deny');
                result.set("Status", -2);

                // Save the updated object
                result.save().then(function(updatedResult) {
                    // Handle success if needed
                    console.log("Status updated successfully for object with ID: ", updatedResult.id);
                }).catch(function(error) {
                    // Handle error
                    console.error("Error updating status for object with ID: ", result.id, ", Error: ", error);
                });

                // Reload Table
                alert("Denied Application")
                location.reload();
            });

            
        }
        else if (result.get("Status") == 3) {
             cells[5].textContent =  statusDictionary[result.get("Status")] + "\n" + result.get("AcceptedCourse")
        } else {
              cells[5].textContent = statusDictionary[result.get("Status")]                                                              
        }
        
        

 

        // Make the cloned row visible
        newRow.removeAttribute('hidden');

        // Append the cloned row to the table's tbody
        var tbody = document.querySelector('#currentAndPastTable tbody');
        tbody.appendChild(newRow);


    });
});
console.log("Script has been loaded");

