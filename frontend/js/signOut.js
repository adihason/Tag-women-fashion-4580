function signOutUser(){
    // const $welomeUserDiv = document.querySelector("#welcome-user");
    localStorage.removeItem(`user`);
    domElements.$weclomeUserDiv.innerHTML = "";
}