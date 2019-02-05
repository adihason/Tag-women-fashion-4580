window.domElements = {
    $loginEmailInput: document.querySelector("#email-login-input"),
    $loginPasswordInput: document.querySelector("#password-login-input"),
    $invalidMessagePopUpLogin: document.querySelector("#popup-text-invalid-login"),
};


const BASE_URL = "http://localhost:3000";
function route(path) {
    const temp = `${BASE_URL}/${path}`;
    return temp;
}


function getUser() {
    fetch(route(`user?email=${domElements.$loginEmailInput.value}&password=${domElements.$loginPasswordInput.value}`))
        .then(res => res.json())
        .then(resJsonBody => {
            const loggedUser = resJsonBody[0];
            if (!loggedUser) {
                displayMsg("Invalid Email Or Password.", domElements.$invalidMessagePopUpLogin, 3000);
                return;
            }
            const user = createNewUserInstance(loggedUser);
            localStorage.setItem(`user`, JSON.stringify(user));
            window.location.href = "index.html";
        })
        .catch(reason => console.log("Error", reason.message));
}


