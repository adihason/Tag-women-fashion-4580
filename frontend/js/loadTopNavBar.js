
$("header").load("topNavBar.html", () => {
    const $welomeUserDiv = document.querySelector("#welcome-user");
    const user = localStorage.getItem(`user`);
    if(user){
        const userObj = JSON.parse(user);
        $welomeUserDiv.innerHTML = `Hi ${userObj.firstName}`;
    }
});