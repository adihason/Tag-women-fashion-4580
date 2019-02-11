window.domElements = {
    $successMessage: document.querySelector(".alert-success"),
    $removeMessage: document.querySelector(".alert-danger")

}


async function userPressToAddLike(itemId) {
    const user = JSON.parse(localStorage.getItem(`user`));
    user.likes["likeId"] = itemId;
    user.likes["imageUrl"] = $(`#${itemId} img.card-img-top`).attr("src");
    user.likes["itemPrice"] = $(`#${itemId} li.list-group-item`).text();
    user.likes["itemDescreption"] = $(`#${itemId} h5.card-title`).text();
    let islikeUpdate = await updateLikeToDB(user);
    if (islikeUpdate) {
        changeColorAfterPressLike(itemId);
        displayMsg("The item  was added to your wish list", domElements.$successMessage, 2000);
    }
}

async function userPressToRemoveLike(itemId, user, likes) {
    const user = JSON.parse(localStorage.getItem(`user`));
    user.likes = user.likes.filter(function (item) {
        return !(item.likeId === itemId)
    });
    let islikeUpdate = await updateLikeToDB(user);
    if (islikeUpdate) {
        changeColorAfterPressDeleteLike(itemId);
        displayMsg("The item was removed from your wish list", domElements.$removeMessage, 2000);
    }
}


function toggle(itemId) {
    if ($(`#${itemId} button.btn-primary`).hasClass("liked-button")) {
        return userPressToRemoveLike(itemId);
    }
    return userPressToAddLike(itemId)
}


function updateLikeToDB(user) {
    return fetch(route(`user/${user.id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            birthday: user.birthday,
            likes: [...user.likes, {
                likeId: user.likes["likeId"],
                imageUrl: user.likes["imageUrl"],
                itemPrice: user.likes["itemPrice"],
                itemDescreption: user.likes["itemDescreption"]
            }],
            items: [...user.items, {
                itemId: user.items["itemId"],
                imageUrl: user.items["imageUrl"],
                itemPrice: user.items["itemPrice"],
                itemDescreption: user.items["itemDescreption"]
            }]
        })
    })
        .then(res => res.json())
        .then(user => {
            user.likes = user.likes.filter(function (value) {
                return Object.keys(value).length !== 0
            });
            user.items = user.items.filter(function (value) {
                return Object.keys(value).length !== 0
            });
            localStorage.setItem(`user`, JSON.stringify(user));
            return true;
        })
        .catch(reason => {
            console.log("Error", reason.message);
            return false;
        });
}


function changeColorAfterPressLike(itemId) {
    $(`#${itemId} button.btn-primary`).addClass("liked-button");
}


function changeColorAfterPressDeleteLike(itemId) {
    $(`#${itemId} button.btn-primary`).removeClass("liked-button");
}


