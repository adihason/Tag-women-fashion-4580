window.domElements = {
    $registerFirstNameInput: document.querySelector("#first-name-register"),
    $registerLastNameInput: document.querySelector("#last-name-register"),
    $registerEmailInput: document.querySelector("#email-register"),
    $registerBirthdayInput: document.querySelector("#birthday-register"),
    $registerPasswordInput: document.querySelector("#password-register"),
    $invalidMessagePopUpRegister: document.querySelector("#popup-text-invalid-register"),
    $joinButton: document.querySelector("#register-button")
};


const BASE_URL = "http://localhost:3000";
function route(path) {
    return `${BASE_URL}/${path}`;
}


domElements.$registerEmailInput.addEventListener('blur', isValidEmail);


domElements.$registerFirstNameInput.addEventListener('blur', isValidName);


domElements.$registerLastNameInput.addEventListener('blur', isValidName);


domElements.$registerPasswordInput.addEventListener('blur', isValidPassword);


async function isValidEmail() {
    let isValidEmail = domElements.$registerEmailInput.checkValidity();
    let isEmailDoesntExist = await checkIfEmailExist(domElements.$registerEmailInput.value);
    if (!isValidEmail) {
        displayMsg("Invalid Email - the format is: example@example.example", domElements.$invalidMessagePopUpRegister, 3000);
        return false;
    }
    else if (!isEmailDoesntExist) {
        displayMsg("Email Is Already Exists", domElements.$invalidMessagePopUpRegister, 3000);
        return false;

    }

    if (isValidEmail && isEmailDoesntExist) {
        return true;
    }
    else {
        return false;
    }
}


function isValidPassword() {
    if (domElements.$registerPasswordInput.value.length < 6 || !isNaN(domElements.$registerPasswordInput.value)) {
        displayMsg("Invalid Password - please type 6-8 characters include numbers and letters", domElements.$invalidMessagePopUpRegister, 3000);
        return false;
    }
    // 
    else {
        return true;
    }
}


function isValidName() {
    if (!(typeof domElements.$registerFirstNameInput.value === 'string') || !(typeof domElements.$registerLastNameInput.value === 'string') || (domElements.$registerFirstNameInput.value === '') || (domElements.$registerLastNameInput.value === '')) {
        displayMsg("Invalid Name - please insert letters only!", domElements.$invalidMessagePopUpRegister, 3000);
        return false;
    }
    else {
        return true;
    }

}


function checkIfEmailExist(email) {
    return fetch(route(`user`))
        .then(res => res.json())
        .then(function (jsonResBody) {
            for (let i = 0; i < jsonResBody.length; i++) {
                if (jsonResBody[i]["email"] === email) {
                    return false
                }
            }
            return true;
        })
        .catch(reason => {
            console.log("Error", reason.message);
            return false;
        });

}


async function checkInputsValidation() {
    const validEmail = await isValidEmail();
    const validPassword = isValidPassword();
    const validName = isValidName();
    if (validEmail && validPassword && validName) {
        addUser();
    }
}


function addUser() {
    fetch(route("user"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: domElements.$registerFirstNameInput.value,
            lastName: domElements.$registerLastNameInput.value,
            email: domElements.$registerEmailInput.value,
            password: domElements.$registerPasswordInput.value,
            birthday: domElements.$registerBirthdayInput.value,
            likes: [],
            items: []
        })
    }).then(res => {
        console.log(res)
        getUserAfterRegistretion(domElements.$registerEmailInput.value, domElements.$registerPasswordInput.value)
    })
        .catch(reason => console.log("Error", reason.message));
}


function getUserAfterRegistretion(userEmail, passwordUser) {
    fetch(route(`user?email=${userEmail}&password=${passwordUser}`))
        .then(res => res.json())
        .then(resJsonBody => {
            const loggedUser = resJsonBody[0];
            const user = createNewUserInstance(loggedUser);
            localStorage.setItem(`user`, JSON.stringify(user));
            window.location.href = "index.html";
        })
        .catch(reason => console.log("Error", reason.message));
}