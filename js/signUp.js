Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";


async function login() {
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	try {
		let user = await Parse.User.logIn(username, password);
		// login success
		console.log("User successfully logged in", user);
		location.href = 'index.html';
	}
	catch (error) {
		// login failed
		console.error("Error while logging in user", error);
	}
} 

document.getElementById("login").addEventListener("click", async function () {
  login();
});



async function signUp() {
	let user = new Parse.User();
	user.set("username", document.getElementById("username").value);
	user.set("email", document.getElementById("email").value);
	user.set("password", document.getElementById("password").value);
	try {
		user = await user.save();
		if (user !== null) {
			alert(
				`New username created! Hello ${user.get("username")}`
			);
		}
	} catch (error) {
		alert(`Error: ${error.message}`);
	}
}

document.getElementById("createButton").addEventListener("click", async function () {
	signUp();
});