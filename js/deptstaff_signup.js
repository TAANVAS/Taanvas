Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";


async function signUp() {
	let user = new Parse.User();
	user.set("Phone", document.getElementById("Phone").value);
	user.set("username", document.getElementById("username").value);
	user.set("password", document.getElementById("password").value);
	user.set("Department", document.getElementById("Department").value);
	try {
		user = await user.save();
		if (user !== null) {
			alert(
				`New user created! Hello ${user.get("username")}`
			);
			location.href = 'index.html';
		}
	} catch (error) {
		alert(`Error: ${error.message}`);
	}
}

document.getElementById("signUp").addEventListener("click", async function () {
	signUp();
});