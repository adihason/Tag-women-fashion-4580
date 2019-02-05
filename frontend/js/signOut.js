function signOutUser() {
    localStorage.removeItem(`user`);
    domElements.$weclomeUserDiv.innerHTML = "";
}