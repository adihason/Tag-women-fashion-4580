window.domElements = {
    $successMessage: document.querySelector("#popup-text-success"),
    $removeMessage: document.querySelector("#popup-text-remove"),
    $removeMessageCart: document.querySelector("#popup-text-remove-cart"),
    $targetContainer: document.querySelector("#output-images"),
    $template: document.querySelector("#clone"),
    $emptyCart: document.querySelector("#empty-cart"),
    $shopNowBtn: document.querySelector("#shop-now-btn-cart")
}


async function addItemBag(itemId) {
    const user = JSON.parse(localStorage.getItem(`user`));
    user.items["itemId"] = itemId;
    user.items["imageUrl"] = $(`#${itemId} img.card-img-top`).attr("src");
    user.items["itemPrice"] = $(`#${itemId} li.list-group-item`).text();
    user.items["itemDescreption"] = $(`#${itemId} h5.card-title`).text();
    let isBagUpdate = await updateBagToDB(user);
    if (isBagUpdate) {
        displayMsg("The item  was added to your bag", domElements.$successMessage, 2000);
    }

}


function updateBagToDB(user) {
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


function loadUserCart() {
    if (`user` in localStorage) {
        const user = JSON.parse(localStorage.getItem(`user`));
        if (user.items.length !== 0) {
            for (let i = 0; i < user.items.length; i++) {
                createNewImageInCart(domElements.$targetContainer, domElements.$template, user.items[i]);
            }
        }
        else {
            domElements.$emptyCart.classList.remove("d-none");
            domElements.$shopNowBtn.classList.remove("d-none");
            $(`#empty-cart`).append(`<h1 id="empty-cart-title">You  have  no  Saved  Items</h1>`);

        }
    }
    else {
        domElements.$emptyCart.classList.remove("d-none");
        domElements.$shopNowBtn.classList.remove("d-none");
        $(`#empty-cart`).append(`<h1 id="empty-cart-title">You  have  no  Saved  Items</h1>`);

    }
}


function createNewImageInCart($targetContainer, $template, item) {
    const $clonedContainer = $template.cloneNode(true);
    const keyWordsIdArr = item["itemId"].split('-');
    const productType = keyWordsIdArr[1];
    const productNum = keyWordsIdArr[2];
    const id = `${productType}-${productNum}`;
    $clonedContainer.id = `card-${id}`;
    $clonedContainer.querySelector(".card-img-top").src = item["imageUrl"];
    $clonedContainer.querySelector(".card-img-top").id = `img-${id}`
    $clonedContainer.querySelector(".card-title").innerHTML = item["itemDescreption"];
    $clonedContainer.querySelector(".list-group-item").innerHTML = item["itemPrice"];
    $clonedContainer.querySelector(".btn-primary").id = `like-btn-${id}`
    $clonedContainer.classList.remove("d-none");
    $targetContainer.appendChild($clonedContainer);
}


async function userPressToRemoveItem(itemId) {
    const user = JSON.parse();
    user.items = user.items.filter(function (item) {
        return !(item.itemId === itemId)
    });
    let isBagUpdate = await updateBagToDB(user);
    if (isBagUpdate) {
        $(`#${itemId}`).addClass("d-none");

        displayMsg("The item removed from your bag", domElements.$removeMessageCart, 2000);
    }
}