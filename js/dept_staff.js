Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {    

} else {
    //location.href = 'login.html';
    console.log("NOT LOGGED IN!")
}


var Posts = Parse.Object.extend("User");
var Reports = Parse.Object.extend("Report");
var Courses = Parse.Object.extend("Course");

document.addEventListener('DOMContentLoaded', () => {
    const applicantForm = document.getElementById('applicantForm');

    applicantForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(applicantForm);
        const name = formData.get('name');
        const crn = formData.get('CRN');
        const courseID = formData.get('courseID');
        const term = formData.get('Term');

        // Create a new object in your class
        var myApp = new Courses();

        // Add values to the array field
        //myObject.set("arrayField", ["value1", "value2", "value3"]);
        myApp.set("Name", name)
        myApp.set("CRN", Number(crn))
        myApp.set("CourseID", courseID)
        myApp.set("Term", term)

        // Save the object
        myApp.save().then((object) => {
          console.log('Object saved successfully with array field:', object);
          window.alert('Your course has been added successfully!');
        }).catch((error) => {
          console.error('Error saving object:', error);
          window.alert('Error adding course, please try again later.');
        });
    });
});

var loading = false

document.getElementById('courseIDInput').addEventListener('input', function(event) {
    if (loading) {return}
    loading = true
    // Code to execute whenever input is changed
    var table = document.getElementById('coursesTable')

    
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    table.innerHTML = ''
    
    var newRow = table.insertRow();
    // Create new cells
    var nameCell = newRow.insertCell(0);
    nameCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    nameCell.textContent = "Course Name"
    var crnCell = newRow.insertCell(1);
    crnCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    crnCell.textContent = "CRN"
    var idCell = newRow.insertCell(2);
    idCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    idCell.textContent = "Course ID"
    var termCell = newRow.insertCell(3);
    termCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    termCell.textContent = "Term"
    var delCell = newRow.insertCell(4);
    delCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center', 'text-white', 'bg-blue-950');
    delCell.textContent = "Delete"
    
    console.log('Input changed:', event.target.value.toUpperCase());
    courseQuery = new Parse.Query(Courses);
    
    courseQuery.contains("CourseID", event.target.value.toUpperCase());

            
    courseQuery.find().then(function(results) {
    // Loop through each object in the results array
        results.forEach(function(result) {

            
            
            // Object with the specific ZNumber found
            console.log(result);
                        
            // Create a new row
            var newRow = table.insertRow();

            // Create new cells
            var nameCell = newRow.insertCell(0);
            nameCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center');
            var crnCell = newRow.insertCell(1);
            crnCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center');
            var idCell = newRow.insertCell(2);
            idCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center');
            var termCell = newRow.insertCell(3);
            termCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center');
            
            // Create the deny button
            var denyCell = newRow.insertCell(4);
            var denyButton = document.createElement('button');
            denyButton.textContent = 'Delete';
            denyButton.classList.add('denyButton', 'px-4', 'py-2', 'bg-red-500', 'text-white', 'rounded', 'flex', 'justify-center', 'items-center');
            denyCell.classList.add('px-4', 'py-2', 'rounded', 'flex', 'justify-center', 'items-center');
            denyCell.appendChild(denyButton)
            
            // Define the event function
            function handleDenyButtonClick(event) {
                // Access the row containing the deny button that was clicked
                var row = event.target.closest('tr');

                // Delete the row from the table
                row.remove();
                
                result.destroy();
            }

            // Attach the event listener to the deny button
            denyButton.addEventListener('click', handleDenyButtonClick);
            
            nameCell.textContent = result.get("Name");
            idCell.textContent = result.get("CourseID");
            crnCell.textContent = result.get("CRN");
            termCell.textContent = result.get("Term");
    
            reportsQuery = new Parse.Query(Reports);
            console.log("OBJECTID: "+result.id)
            const userPointer = Parse.User.createWithoutData(result.id);
            reportsQuery.equalTo("User", userPointer);

            reportsQuery.first().then((result2) => {
                if (result2) {
                    console.log(result2)
                    reportCell.textContent = result2.get("ReportString")
                }
            })
        });
    });
            
    setTimeout(function() {
        loading = false;
    }, 100); // Adjust the debounce time as needed
});

var event = new Event('input');

// Dispatch the event
courseIDInput.dispatchEvent(event);
