window.domElements = {
    $removeMessageWishList: document.querySelector("#popup-text-remove-wishlist"),
    $targetContainer: document.querySelector("#output-images"),
    $template: document.querySelector("#clone"),
    $emptyWishList: document.getElementById("empty-wish-list"),
    $shopNowBtn: document.querySelector("#shop-now-btn")
}


function loadWishList() {
    if (`user` in localStorage) {
        const user = JSON.parse(localStorage.getItem(`user`));
        user.likes = user.likes.filter(function (value) {
            return Object.keys(value).length !== 0
        });
        if (user.likes.length !== 0) {
            for (let i = 0; i < user.likes.length; i++) {
                createNewImageInWishList(domElements.$targetContainer, domElements.$template, user.likes[i]);
            }
        }
        else {
            domElements.$emptyWishList.classList.remove("d-none");
            domElements.$shopNowBtn.classList.remove("d-none");
            $(`#empty-wish-list`).append(`<h1 id="empty-wishlist-title">You  have  no  Saved  Items</h1>`);

        }
    }
    else {
        domElements.$emptyWishList.classList.remove("d-none");
        domElements.$shopNowBtn.classList.remove("d-none");
        $(`#empty-wish-list`).append(`<h1 id="empty-wishlist-title">You  have  no  Saved  Items</h1>`);

    }
}


function createNewImageInWishList($targetContainer, $template, item) {
    const $clonedContainer = $template.cloneNode(true);
    const keyWordsIdArr = item["likeId"].split('-');
    const productType = keyWordsIdArr[1];
    const productNum = keyWordsIdArr[2];
    const id = `${productType}-${productNum}`;
    $clonedContainer.id = `card-${id}`;
    $clonedContainer.querySelector(".card-img-top").src = item["imageUrl"];
    $clonedContainer.querySelector(".card-img-top").id = `img-${id}`
    $clonedContainer.querySelector(".card-title").innerHTML = item["itemDescreption"];
    $clonedContainer.querySelector(".list-group-item").innerHTML = item["itemPrice"];
    $clonedContainer.querySelector(".btn-warning").id = `view-btn-${id}`;
    $clonedContainer.querySelector(".btn-dark").id = `cart-btn-${id}`;
    $clonedContainer.querySelector(".btn-primary").id = `like-btn-${id}`
    $clonedContainer.classList.remove("d-none");
    $targetContainer.appendChild($clonedContainer);
    checkLikedButtonAndChangeColor($clonedContainer.id);
}


function removeItemFromWishList(likeId) {
    $(`#${likeId}`).parent().parent().addClass("d-none");
    displayMsg("The item removed from your wish list", domElements.$removeMessageWishList, 2000);
}
