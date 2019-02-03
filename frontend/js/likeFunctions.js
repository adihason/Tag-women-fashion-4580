async function userPressToAddLike(itemId) {
    const user = JSON.parse(localStorage.getItem(`user`));
    user.likes.push(itemId);
    let islikeUpdate = await updateLikeToDB(user);
    if (islikeUpdate) {
        changeColorAfterPressLike(itemId);
    }
}

async function userPressToRemoveLike(itemId) {
    const user = JSON.parse(localStorage.getItem(`user`));
    const indexToRemove = user.likes.indexOf(itemId);
    user.likes.splice(indexToRemove, 1);
    let islikeUpdate = await updateLikeToDB(user);
    if (islikeUpdate) {
        changeColorAfterPressDeleteLike(itemId);
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
            items: user.items
        })
    })
        .then(res => res.json())
        .then(user => {
            localStorage.setItem(`user`, JSON.stringify(user));
            return true;
        })
        .catch(reason => {
            console.log("Error", reason.message);
            return false;
        }
        );
}

function changeColorAfterPressLike(itemId) {
    $(`#${itemId} button.btn-primary`).addClass("liked-button");
}

function changeColorAfterPressDeleteLike(itemId) {
    $(`#${itemId} button.btn-primary`).removeClass("liked-button");
}


