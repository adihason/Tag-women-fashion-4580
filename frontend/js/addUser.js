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


domElements.$registerPasswordInput.addEventListener('blur', isValidPassword);

function isValidEmail(){
    let isValidEmail = domElements.$registerEmailInput.checkValidity();
    if(!isValidEmail){
        displayMsg("Invalid Email - the format is: example@example.example", domElements.$invalidMessagePopUpRegister, 3000);
    }
    return isValidEmail;
}

function isValidPassword(){
    let isValidPassword = true;
    if(domElements.$registerPasswordInput.value.length < 6 || domElements.$registerPasswordInput.value.length > 8 || !isNaN(domElements.$registerPasswordInput.value)){
        isValidPassword = false; 
    }
    if(!isValidPassword){
        displayMsg("Invalid Password - please type 6-8 characters include numbers and letters", domElements.$invalidMessagePopUpRegister, 3000);
        // domElements.$invalidMessagePopUpRegister.innerHTML = "Invalid Password - please type 6-8 characters include numbers and letters";
    }
    return isValidPassword
}



function checkInputsValidation(){
   
if(isValidEmail() && isValidPassword()){
        addUser();
    }

}

function addUser() {
    fetch(route("user"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            // "Content-Type": "application/x-www-form-urlencoded",
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
    }).then(res => {console.log(res)
        getUserAfterRegistretion(domElements.$registerEmailInput.value, domElements.$registerPasswordInput.value)})
    // .then(getUserAfterRegistretion())
    .catch(reason => console.log("Error", reason.message));
}

function getUserAfterRegistretion(userEmail, passwordUser){
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