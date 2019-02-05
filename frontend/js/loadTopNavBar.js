
$("header").load("topNavBar.html", () => {
    const $welcomeUserDiv = document.querySelector("#welcome-user");
    const $deleteAccount = document.querySelector("#delete-account-link");
    const user = localStorage.getItem(`user`);
    if (user) {
        const userObj = JSON.parse(user);
        $welcomeUserDiv.innerHTML = `Hi ${userObj.firstName}`;
        $deleteAccount.classList.remove("d-none");
    }
});