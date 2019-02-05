function deleteAccount() {
    const user = JSON.parse(localStorage.getItem(`user`));
    userId = user.id;
    fetch(route(`user/${userId}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        localStorage.removeItem(`user`);
        domElements.$weclomeUserDiv.innerHTML = "";
        window.location.href = "deleteUserPage.html";

    })
    .catch(reason => console.log("Error", reason.message));

}