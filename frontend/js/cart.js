function addItemBag(btnId, cardId){
    // likeBtn = document.getElementById(idLikeBtn);
    // likeBtn.style.backgroundColor = "red";
    // likeBtn.style.borderColor = "red";
    // createNewLikeInstance(idLikeBtn);
    let itemId = cardId[1].id;
    const user = JSON.parse(localStorage.getItem(`user`));
    user.items.push(itemId);
    addItemToDB(user);
    localStorage.setItem(`user`, JSON.stringify(user));
    document.getElementById(btnId).setAttribute("data-dismiss", `modal`);
}



function addItemToDB(user) {
    fetch(route(`user/${user.id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            birthday: user.birthday,
            likes: user.likes,
            bag_items: user.items
        })
     })
    .catch(reason => console.log("Error", reason.message));
}