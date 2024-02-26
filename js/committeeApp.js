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
    var url = window.location.href;

    // Create a URLSearchParams object from the URL
    var urlParams = new URLSearchParams(url);

    // Get the value of the 'id' parameter from the URL
    var username = urlParams.get('username');
    
    console.log(username)
    
    query.equalTo('username', username);
    query.first().then(function(result) {
      if (result) {
          
        var table = document.getElementById('appTable')

        // Create a new row
        var newRow = table.insertRow();

        // Create new cells
        var nameCell = newRow.insertCell(0);
        var appliedDateCell = newRow.insertCell(1);
        var CVCell = newRow.insertCell(2);
        var recommendCell = newRow.insertCell(3);
        var requestedCell = newRow.insertCell(4);
        var pastCell = newRow.insertCell(5);
        
          
        // Set the cell content
        nameCell.textContent = result.get("username");
        
        if (result.get("appliedDate")) {
            var formattedDate = result.get("appliedDate").toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
            appliedDateCell.textContent = formattedDate;
        }
        
        CVCell.textContent = result.get("CV");
        recommendCell.textContent = result.get("requestedClasses");
        requestedCell.textContent = result.get("recommendedClasses");
        pastCell.textContent = result.get("pastClasses");
        
        
      } else {
        console.log('No results found.');
      }
    }).catch(function(error) {
      console.error('Error:', error);
    });
}

loadPosts(5);