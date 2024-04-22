Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {    
    const Application = Parse.Object.extend("Application");
    const query = new Parse.Query(Application);
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
            const qualifiedCourses = object.get('QualifiedCourses');
            const previousTA = object.get('PreviousTA');
            const relevantCourses = object.get('RelevantCourses');
            const Name = currentUser.get('username');
            const Status = object.get('Status');

            qualifiedCourses.forEach((course) => {
                console.log(course);
                const row = document.createElement('tr');

                switch (Status) {
                    case -1:
                        statusText = "Denied";
                        break;
                    case 0:
                        statusText = "Pending Review";
                        break;
                    case 1:
                        statusText = "Committee Staff Recommended";
                        break;
                    case 2:
                        statusText = "Approved";
                        break;
                    default:
                        statusText = "Error Status";
                } 

                row.innerHTML = `
                    <td class="py-2 px-4 border-b border-gray-300 text-center">${Name}</td>
                    <td class="py-2 px-4 border-b border-gray-300 text-center">${course}</td>
                    <td class="py-2 px-4 border-b border-gray-300 text-center">${previousTA}</td>
                    <td class="py-2 px-4 border-b border-gray-300 text-center">${relevantCourses}</td>
                    <td class="py-2 px-4 border-b border-gray-300 text-center">${statusText}</td>
                `;
                tableBody.appendChild(row);
            });
            //create new rows in the table for each object

        });
    }).catch((error) => {
        console.error("Error fetching Application objects: " + error.message);
    });

} else {
    //location.href = 'login.html';
    console.log("NOT LOGGED IN!")
}


console.log("Script has been loaded");