//select form, username, email, password, password2
const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

//Form eventListener
form.addEventListener("submit", (e) => {
	e.preventDefault();
	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
});

//check required fields
function checkRequired(inputArr) {
	inputArr.forEach((input) => {
		const value = input.value;
		if (value.trim() === "") {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

//show error function
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = "form-control error";
	const small = formControl.querySelector("small");
	small.innerText = message;
}

//show success function
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

//getFieldName function
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//checkLength function
function checkLength(input, min, max) {
	const value = input.value;
	if (value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
	} else if (value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
	} else {
		showSuccess(input);
	}
}

//checkEmail function
/* https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript */
function checkEmail(input) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, "Email is not valid");
	}
}

//checkPasswordsMatch function
function checkPasswordsMatch(password1, password2) {
	if (password1.value !== password2.value) {
		showError(password2, "Passwords do not match");
	}
}
