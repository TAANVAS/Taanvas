Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

const currentUser = Parse.User.current();

if (currentUser) {    
    document.getElementById("username").innerHTML = currentUser.getUsername()
    currentUsername = currentUser.getUsername()
} else {
    //location.href = 'login.html';
    console.log("NOT LOGGED IN!")
}


var Posts = Parse.Object.extend("User");
var Reports = Parse.Object.extend("Report");


var postNum = 0
query = new Parse.Query(Posts);

function loadPosts(numPosts) {
    query.addAscending("appliedDate")
    //query.limit(numPosts)
    //query.skip(postNum)
    postNum = postNum + numPosts
    postList = query.find()
    query.find().then(function(results) {
        for (let step = 0; step < results.length; step++) {
            console.log(results[step].get("appliedDate"))
            if (results[step].get("appliedDate") == null) {
                continue;
            }
            var table = document.getElementById('appTable')
            
            // Create a new row
            var newRow = table.insertRow();

            // Create new cells
            var nameCell = newRow.insertCell(0);
            nameCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
            var appliedDateCell = newRow.insertCell(1);
            appliedDateCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
            var CVCell = newRow.insertCell(2);
            CVCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');
            var applicationCell = newRow.insertCell(3);
            applicationCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300');

            // Set the cell content
            nameCell.textContent = results[step].get("username");
            
            if (results[step].get("appliedDate")) {
                var formattedDate = results[step].get("appliedDate").toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
                appliedDateCell.textContent = formattedDate;
            } else {
                appliedDateCell.textContent = "N/A"
            }
            
            if (results[step].get("CV")) {
                // Assuming 'fileLink' contains the URL of the PDF file
                var fileLink = results[step].get("CV")._url;
                // Create an anchor element
                var linkElement = document.createElement('a');
                // Set the href attribute to the URL of the PDF file
                linkElement.setAttribute('href', fileLink);
                linkElement.style.textDecoration = "underline";
                linkElement.style.color = "blue"; // Adjust the color as needed
                linkElement.setAttribute('target', '_blank');
                // Set the text content to "CV.pdf"
                linkElement.textContent = "CV.pdf";
                // Append the link
                CVCell.appendChild(linkElement);
            } else {
                CVCell.textContent = "N/A"
            }

               
            // Create a button element
            var button = document.createElement('button');

            // Set the text content of the button
            button.textContent = 'View Application';

            //Add Tailwind CSS pill button classes
            button.className = "bg-red-600 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"; 

            // Set the onclick attribute of the button to a JavaScript function
            button.onclick = function() {
                window.location.href = window.location.origin+'/ta_committee/application.html?username='+encodeURIComponent(results[step].get("username"));
            };


            // Append the anchor element to the cell
            applicationCell.appendChild(button);
                        
            
            /*replaceUsername = newPost.replaceAll("USERNAMEHERE", results[step].get("poster"))
            replaceTitle = replaceUsername.replaceAll("TITLEHERE", results[step].get("title"))
            replaceCaption = replaceTitle.replaceAll("CAPTIONHERE", results[step].get("caption"))
            replaceImg = replaceCaption.replaceAll("IMGSRCHERE", results[step].get("image")._url)
            replaceLikes = replaceImg.replaceAll("NUMLIKESHERE", results[step].get("likes").length)
            replacePostId = replaceLikes.replaceAll("POSTIDHERE", results[step].id)

            if (results[step].get("poster") == currentUsername) {
                replaceHidden = replacePostId.replaceAll("HIDDENHERE", "")
            }
            else {
                replaceHidden = replacePostId.replaceAll("HIDDENHERE", "hidden")
            }*/
        }
    });
}

loadPosts(5);

document.getElementById('ZNumberInput').addEventListener('input', function(event) {
    // Code to execute whenever input is changed
    console.log('Input changed:', event.target.value);
    znumQuery = new Parse.Query(Posts);
    
    znumQuery.equalTo("Znumber", event.target.value);
    
    znumQuery.first().then((result) => {
        if (result) {
            
            

            
            
            // Object with the specific ZNumber found
            console.log(result);
            
            
            var table = document.getElementById('performanceTable')
            
            // Create a new row
            var newRow = table.insertRow();

            // Create new cells
            var nameCell = newRow.insertCell(0);
            nameCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center');
            var reportCell = newRow.insertCell(1);
            reportCell.classList.add('py-2', 'px-4', 'border-b', 'border-gray-300', 'text-center');

            // Set the cell content
            nameCell.textContent = result.get("username");
            
            if (!result.get("CV")) {
                // Assuming 'fileLink' contains the URL of the PDF file
                var fileLink = results[step].get("CV")._url;
                // Create an anchor element
                var linkElement = document.createElement('a');
                // Set the href attribute to the URL of the PDF file
                linkElement.setAttribute('href', fileLink);
                linkElement.style.textDecoration = "underline";
                linkElement.style.color = "blue"; // Adjust the color as needed
                linkElement.setAttribute('target', '_blank');
                // Set the text content to "CV.pdf"
                linkElement.textContent = "CV.pdf";
                // Append the link
                CVCell.appendChild(linkElement);
            } else {
                //CVCell.textContent = "N/A"
            }
    
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
            
            
            
        } else {
            // Object with the specific ZNumber not found
            console.log("Object not found for the specific ZNumber.");
        }
    }).catch((error) => {
        console.error("Error fetching object: ", error);
    });
});