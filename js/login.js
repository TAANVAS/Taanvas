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
