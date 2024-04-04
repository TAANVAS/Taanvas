Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";


// Create a URLSearchParams object from the URL
var urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter from the URL
var type = urlParams.get('type');

if (type == null) {
    location.href = 'index.html'
}

async function signUp() {
	let user = new Parse.User();
	user.set("username", document.getElementById("username").value);
    user.set("Znumber", document.getElementById("Znumber").value);
	user.set("Phone", document.getElementById("Phone").value);
	user.set("email", document.getElementById("email").value);
	user.set("password", document.getElementById("password").value);
    user.set(type, true);
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