Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";


// Create a URLSearchParams object from the URL
var urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter from the URL
var type = urlParams.get('type');

if (type == null) {
    location.href = 'index.html'
}

// Function to validate password complexity
function validatePassword(password) {
    // Password complexity regex pattern
    let passwordPattern = /^(?=.*\d.*\d.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    
    // Check if password meets complexity requirements
    return passwordPattern.test(password);
}

// Event listener for the input event on the password input field
document.getElementById("password").addEventListener("input", function () {
    let password = document.getElementById("password").value;
    console.log("input changed")
    // Validate password complexity
    if (!validatePassword(password)) {
        document.getElementById("validation").classList.remove("hidden");
        console.log("incorrect")
    } else {
        document.getElementById("validation").classList.add("hidden");
        console.log("correct")
    }
});

async function signUp() {
	let user = new Parse.User();
	user.set("username", document.getElementById("username").value);
    user.set("Znumber", document.getElementById("Znumber").value);
	user.set("Phone", document.getElementById("Phone").value);
	user.set("email", document.getElementById("email").value);
	user.set("password", document.getElementById("password").value);
    user.set(type, true);
    
    // Validate password complexity
    if (!validatePassword(document.getElementById("password").value)) {
        alert("Password must contain at least 3 numbers, a capital letter, and a special character (!@#$%^&*), and be at least 8 characters long.");
        return;
    }
    
	try {
		user = await user.save();
		if (user !== null) {
			alert(
				`New user created! Hello ${user.get("email")}`
			);
			location.href = 'login.html?type='+type;
		}
	} catch (error) {
		alert(`Error: ${error.message}`);
	}
}

document.getElementById("signUp").addEventListener("click", async function () {
	signUp();
});