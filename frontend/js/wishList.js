
function loadWishList() {
    if(`user` in localStorage){
        const user = JSON.parse(localStorage.getItem(`user`));
        for (let i = 0; i < user.likes.length; i++) {
            createNewImage(domElements.$targetContainer, domElements.$template, user.likes[i], i);
        }
    }
}

function createNewImage($targetContainer, $template, itemId){
    const $clonedContainer = $template.cloneNode(true);
    const id = itemId;
    $clonedContainer.id = id;
    $clonedContainer.querySelector(".card-img-top").src = $(`#${id} img.card-img-top`).attr("src");
    $clonedContainer.querySelector(".card-img-top").id = `img-${id}`;
    $clonedContainer.querySelector(".card-title").innerHTML = `hrthrt`;
    $clonedContainer.querySelector(".list-group-item").innerHTML = `fhfh`;
    $clonedContainer.querySelector(".btn-dark").id = `cart-btn-${id}`;
    $clonedContainer.querySelector(".btn-primary").id = `like-btn-${id}`;
    $clonedContainer.classList.remove("d-none");
    $targetContainer.appendChild($clonedContainer);
    checkLikedButtonAndChangeColor($clonedContainer.id);
}
