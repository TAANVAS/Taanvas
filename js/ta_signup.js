Parse.initialize("erMai5U9yDcuMfH47yV3DBkzK5DJu9nLtfuM4VLm", "F5sG1HntHNFByrRpHmzJXylHE1e9PJHBAiqOhNCx");
Parse.serverURL = "https://parseapi.back4app.com/";

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

// Function to handle sign-up
async function signUp() {
    let username = document.getElementById("username").value;
    let Znumber = document.getElementById("Znumber").value;
    let phone = document.getElementById("Phone").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Validate password complexity
    if (!validatePassword(password)) {
        alert("Password must contain at least 3 numbers, a capital letter, and a special character (!@#$%^&*), and be at least 8 characters long.");
        return;
    }

    // Your other form validation logic here...

    let user = new Parse.User();
    user.set("username", username);
    user.set("Znumber", Znumber);
    user.set("Phone", phone);
    user.set("email", email);
    user.set("password", password);

    try {
        user = await user.signUp();
        if (user !== null) {
            alert(`New user created! Hello ${user.get("email")}`);
            location.href = 'index.html';
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

document.getElementById("signUp").addEventListener("click", async function () {
    signUp();
});
