const vars = {
    $loginEmailInput: document.querySelector("#email-login-input"),
    $loginPasswordInput: document.querySelector("#password-login-input"),
    $invalidMessagePopUp: document.querySelector("#popup-text-invalid")
};


const BASE_URL = "http://localhost:3000";
function route(path) {
    const temp = `${BASE_URL}/${path}`;
    return temp;
}

function getUser() {
    fetch(route(`user?email=${vars.$loginEmailInput.value}&password=${vars.$loginPasswordInput.value}`))
        .then(res => res.json())
        .then(resJsonBody => {
            const loggedUser = resJsonBody[0];
            if (!loggedUser) {
                displayMsg(vars.$invalidMessagePopUp, 3000);
                return;
            }
            const user = createNewUserInstance(loggedUser);
            localStorage.setItem(`user`, JSON.stringify(user));
            window.location.href = "index.html";
        })
        .catch(reason => console.log("Error", reason.message));
}


function displayMsg(msgId, removeAfter) {
    msgId.classList.remove("invisible");
    // msgId.innerText = msg;
    setTimeout(function () {
        // msgId.innerText = "";
        msgId.classList.add("invisible");
    }, removeAfter);
}

// User.instancesStore = {};

// function createOrGet(rawUser){
//     if(rawUser.email in User.instancesStore){
//         return User.instancesStore[rawUser.email];
//     }

//     const firstName = rawUser["first_name"];
//     const lastName = rawUser["last_name"];
//     const password = rawUser["password"];
//     const email = rawUser["emsil"];
//     const birthday = rawUser["birthday"];
//     const id = rawUser["id"];

//     const currentInstance = new User(id, firstName, lastName, email, password, birthday);
//     User.instancesStore[currentInstance.email] = currentInstance.email;
//     // User.instancesStore[currentInstance.email] = currentInstance.email;
// }

// function setWelcomeUser(userName){
//     vars.$welcomUserSpan.innerHTML = `${userName.firstName} ${userName.lastName}`;
// }






// function getUser() {
//     fetch(route(`user?email=${vars.loginEmailInput.value}&password=${vars.loginPasswordInput.value}`))
//         .then(res => res.json())
//         .then(jsonResBody => console.log("user: ", jsonResBody["fi"]));
// }

// function createNewImage(imageArr, $targetContainer, $template){
//     const $clonedContainer = $template.cloneNode(true);
//     $clonedContainer.id = `image-number-` + Math.random();
//     $clonedContainer.querySelector(".card-img-top").src = imageArr["url"];
//     $clonedContainer.querySelector(".card-title").innerHTML = imageArr["description"];
//     $clonedContainer.querySelector(".list-group-item").innerHTML = `price: ${imageArr["price"]}`;
//     // $clonedContainer.querySelector(".age").innerHTML = user.age;
//     // $clonedContainer.querySelector(".email").innerHTML = user.email;
//     $clonedContainer.classList.remove("d-none");
//     $targetContainer.appendChild($clonedContainer);
// }