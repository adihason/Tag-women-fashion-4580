// window.domElements = {
//     $welcomeUserDiv: document.querySelector("#welcome-user")
// }


$("header").load("topNavBar.html", () => {
    const $welcomeUserDiv = document.querySelector("#welcome-user")
    const user = localStorage.getItem(`user`);
    if(user){
        const userObj = JSON.parse(user);
        $welcomeUserDiv.innerHTML = `Hi ${userObj.firstName}`;
    }
});