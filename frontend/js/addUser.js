const vars = {
    $registerFirstNameInput: document.querySelector("#first-name-register"),
    $registerLastNameInput: document.querySelector("#last-name-register"),
    $registerEmailInput: document.querySelector("#email-register"),
    $registerBirthdayInput: document.querySelector("#birthday-register"),
    $registerPasswordInput: document.querySelector("#password-register")
};


const BASE_URL = "http://localhost:3000";
function route(path) {
    return `${BASE_URL}/${path}`;
}

function addUser() {
    fetch(route("user"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            first_name: vars.$registerFirstNameInput.value,
            last_name: vars.$registerLastNameInput.value,
            email: vars.$registerEmailInput.value,
            password: vars.$registerPasswordInput.value,
            birthday: vars.$registerBirthdayInput.value
        })
    }).then(res => {console.log(res)
        getUserAfterRegistretion(vars.$registerEmailInput.value, vars.$registerPasswordInput.value)})
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