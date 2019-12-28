function signUp() {
	//get new user data from sign up form
	var newUser = document.getElementById("newUserName").value;
	var newEmail = document.getElementById("newUserEmail").value;
	var newPassword = document.getElementById("newUserPwd").value;
	var accept = document.getElementById("formCheck-1");


	if (!accept.checked) {
		alert("Please fill all neccessary fields and accept our terms and agreement");
		sessionStorage.clear();
		return false;

	} else if (accept.checked) {
		alert("Thank you for signing up!");
		//save user data to localstorage
		sessionStorage.setItem("username", newUser);
		sessionStorage.setItem("password", newPassword);
		sessionStorage.setItem("email", newEmail);

		window.location = "booking.html";
		return true;
	}

}

function validate() {
	var loginEmail = document.getElementById("userEmail").value;
	var loginPassword = document.getElementById("userPassword").value;

	//get stored user from localstorage
	var savedEmail = sessionStorage.getItem("email");
	var savePassword = sessionStorage.getItem("password");

	//check if there's a user in localstorage
	if (loginEmail == savedEmail && loginPassword == savePassword) {
		alert("Welcome " + sessionStorage.getItem("username"));

		setTimeout(function () {
			window.location = "booking.html";
		}, 1000);

	} else {
		alert("Please check email or password")
		return false;
	}

}

function Authentication() {
	var email = sessionStorage.getItem("email");

	if (email == null) {
		alert("Please login!");
		setTimeout(function () {
			window.location.href = "index.html";
		});
	}

	displayUser();
}

function displayUser() {
	var user = sessionStorage.getItem("username");
	var currentUser = document.getElementById("currentUser");

	if (user != null) {
		currentUser.innerHTML = user;
	}
}

function SaveBookingDetails() {

	//RandTransaction();

	// var flightOption1 = document.getElementById("roundtrip");
	// var flightOption2 = document.getElementById("one-way");

	var origin = document.getElementById("origin").value;
	var destination = document.getElementById("destination").value;
	var departDate = document.getElementById("departdate").value;
	var returnDate = document.getElementById("returndate").value;
	var adults = document.getElementById("adultpass").value;
	var children = document.getElementById("childpass").value;
	var flightclass = document.getElementById("flightclass").value;

	var parseDepart = Date.parse(departDate);
	var parseReturn = Date.parse(returnDate);
	var departToString = new Date(parseDepart);
	var returnToString = new Date(parseReturn);

	//localStorage.setItem("flightOption", option);
	sessionStorage.setItem("origin", origin);
	sessionStorage.setItem("destination", destination);
	sessionStorage.setItem("departing", departToString);
	sessionStorage.setItem("returning", returnToString);
	sessionStorage.setItem("adult", adults);
	sessionStorage.setItem("children", children);
	sessionStorage.setItem("class", flightclass);

	if (ifOneWay()) {
		sessionStorage.setItem('returning', 'N/A');
	}

}



function Checkout() {
	displayUser();
	/* get the fields needed */

	var passenger = document.getElementById("checkout-name");
	var email = document.getElementById("checkout-email");
	var origin = document.getElementById("checkout-origin");
	var destination = document.getElementById("checkout-destination");
	var departDate = document.getElementById("checkout-departing");
	var returnDate = document.getElementById("checkout-returning");
	var numOfPass = document.getElementById("checkout-numPassengers")
	var checkClass = document.getElementById("checkout-class");
	var total = document.getElementById("checkout-total");

	/* Get data from localStorage */
	var username = sessionStorage.getItem("username");
	var getEmail = sessionStorage.getItem("email")
	// var opt = localStorage.getItem("flightOption");
	var org = sessionStorage.getItem("origin");
	var dest = sessionStorage.getItem("destination");
	var frDate = sessionStorage.getItem("departing");
	var toDate = sessionStorage.getItem("returning");
	var ad = sessionStorage.getItem("adult");
	var child = sessionStorage.getItem("children");
	var flightClass = sessionStorage.getItem("class");

	/* Set details with data from localStorage */
	passenger.innerHTML = username;;
	email.innerHTML = getEmail;
	var price = 99.99;

	origin.innerHTML = org;
	destination.innerHTML = dest;
	departDate.innerHTML = frDate;
	returnDate.innerHTML = toDate;
	var c = parseInt(child);
	var a = parseInt(ad);
	var t = a + c;
	var subTotal = parseFloat(t * price).toFixed(2)
	numOfPass.innerHTML = t ? t : " ";
	checkClass.innerHTML = flightClass;
	total.innerHTML = "$ " + subTotal ? "$ " + subTotal : " ";

	RandTransaction();
}


function ifOneWay() {
	var roundtrip = document.getElementById("roundtrip");
	var oneway = document.getElementById("one-way");

	if (oneway.checked) {
		return true;
	} else {
		return false;
	}
}

function DisableReturnDate() {
	var returning = document.getElementById("returndate");

	returning.disabled = true;
}

function EnableReturnDate() {
	var returning = document.getElementById("returndate");

	returning.disabled = false;
}


function RandTransaction() {
	var transactionNum = "T" + Math.floor(Math.random() * 90000) + 10000;
	sessionStorage.setItem("transactionNum", transactionNum.toString());
}

function Confirmation() {
	displayUser();
	var tNum = sessionStorage.getItem("transactionNum");
	var email = sessionStorage.getItem("email");

	var confirmTrans = document.getElementById("transaction-number");
	var confrimEmail = document.getElementById("contactEmail");

	confirmTrans.innerHTML = tNum;
	confrimEmail.innerHTML = email;
}

function claimConfirmation() {
	alert("Thank you! Your claim has been submitted.\nRedirecting to homepage...");
	setTimeout(function () {
		window.location.href = "index.html";
	}, 1000);
}