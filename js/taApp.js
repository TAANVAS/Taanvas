Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {    

} else {
    //location.href = 'login.html';
    console.log("NOT LOGGED IN!")
}

var Users = Parse.Object.extend("User");
var Applications = Parse.Object.extend("Application");


document.getElementById('name').value = currentUser.getUsername();
document.getElementById('email').value = currentUser.getEmail();

$(document).ready(function() {
    $('.js-example-basic-multiple').select2({
        placeholder: 'Select options',
        allowClear: true,
        width: '100%'
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const previousTASelect = document.getElementById('previousTA');
    const previousTADetails = document.getElementById('previousTADetails');

    previousTASelect.addEventListener('change', () => {
        if (previousTASelect.value === 'yes') {
            previousTADetails.style.display = 'block';
        } else {
            previousTADetails.style.display = 'none';
        }
    });

    const applicantForm = document.getElementById('applicantForm');

    applicantForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(applicantForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const previousTA = formData.get('previousTA');
        let previousCourses = formData.get('previousCourses');

        if (previousTA === 'no') {
            previousCourses = "No courses";
        }
        
        const qualifiedCourses = formData.getAll('qualifiedCourses[]'); // Use getAll for multiple selection
        const cv = formData.get('cv');
        
        //code to save file to Parse server
        var parseFile = new Parse.File(name, cv);
        //save the object to Parse server
        parseFile.save().then(function() {
            
            // Handle form submission - you can perform additional validation or submit data to the server here
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Previously served as TA:', previousTA);
            console.log('Previous Courses:', previousCourses);
            console.log('Qualified Courses:', qualifiedCourses);
            console.log('CV:', cv);

            // Create a new object in your class
            var myApp = new Applications();

            // Add values to the array field
            //myObject.set("arrayField", ["value1", "value2", "value3"]);
            myApp.set("User", currentUser)
            myApp.set("PreviousTA", previousTA)
            myApp.set("RelevantCourses", previousCourses)
            myApp.set("QualifiedCourses", qualifiedCourses)
            myApp.set("CV",parseFile)

            // Save the object
            myApp.save().then((object) => {
              console.log('Object saved successfully with array field:', object);
            }).catch((error) => {
              console.error('Error saving object:', error);
            });
        });
    });
});