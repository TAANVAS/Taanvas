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
            // Runs 5 times, with values of step 0 through 4.
            var table = document.getElementById('appTable')
            
            // Create a new row
            var newRow = table.insertRow();

            // Create new cells
            var nameCell = newRow.insertCell(0);
            var appliedDateCell = newRow.insertCell(1);
            var CVCell = newRow.insertCell(2);
            var applicationCell = newRow.insertCell(3);

            // Set the cell content
            nameCell.textContent = results[step].get("username");
            
            if (results[step].get("appliedDate")) {
                var formattedDate = results[step].get("appliedDate").toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
                appliedDateCell.textContent = formattedDate;
            } else {
                appliedDateCell.textContent = "N/A"
            }
            
            CVCell.textContent = results[step].get("CV");
               
            // Create a button element
            var button = document.createElement('button');

            // Set the text content of the button
            button.textContent = 'View Application';

            // Set the onclick attribute of the button to a JavaScript function
            button.onclick = function() {
                window.location.href = window.location.origin+'/application.html?username='+encodeURIComponent(results[step].get("username"));
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