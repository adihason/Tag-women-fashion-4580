
    // const $targetContainer = document.querySelector("#output-images");
    // const $template = document.querySelector("#clone");

    // const vars = {
    //     $targetContainer: document.querySelector("#output-images"),
    //     $template: document.querySelector("#clone"),
    // };

    window.domElements = {
        $targetContainer: document.querySelector("#output-images"),
        $template: document.querySelector("#clone")
    };

const BASE_URL = "http://localhost:3000";
function route(path) {
    return `${BASE_URL}/${path}`;
}

function loadImages(images) {
    fetch(route(`${images}`))
        .then(res => res.json())
        .then(function (jsonResBody) {
            for (let i = 0; i < jsonResBody.length; i++) {
                const image = createNewImageInstance(jsonResBody[i]);
                createNewImage(image, domElements.$targetContainer, domElements.$template, images, i);
            }
        })
        .catch(reason => console.log("Error", reason.message));
}

function createNewImageInstance(image){
    const id = image["id"];
    const url = image["url"];
    const description = image["description"];
    const price = image["price"];
    return new Image(id, url, description, price);
}

function createNewImage(image, $targetContainer, $template, images, i){
    const $clonedContainer = $template.cloneNode(true);
    const id = `${images}-${i}`;
    $clonedContainer.id = `card-${id}`;
    $clonedContainer.querySelector(".card-img-top").src = image.url;
    $clonedContainer.querySelector(".card-img-top").id = `img-${id}`;
    $clonedContainer.querySelector(".card-title").innerHTML = image.description;
    $clonedContainer.querySelector(".list-group-item").innerHTML = `price: ${image.price}`;
    $clonedContainer.querySelector(".btn-dark").id = `cart-btn-${id}`;
    $clonedContainer.querySelector(".btn-primary").id = `like-btn-${id}`;
    $clonedContainer.classList.remove("d-none");
    $targetContainer.appendChild($clonedContainer);
    checkLikedButtonAndChangeColor($clonedContainer.id);
}

function openModal(cardId, btnId){
    let imgUrl = cardId[1].getAttribute("src");
    document.querySelector(".modal-img").setAttribute("src", imgUrl);
    document.querySelector(".descreption").innerHTML = cardId[3].textContent;
    document.querySelector(".price").innerHTML = cardId[5].textContent;
    document.getElementById(btnId).setAttribute("data-target", `#exampleModal`);
}

function checkLikedButtonAndChangeColor(cardId){
    if(`user` in localStorage){
        const user = JSON.parse(localStorage.getItem(`user`));
        let isItemLiked = user.likes.find(currentCardId => currentCardId===cardId);
        if(isItemLiked){
            changeColorAfterPressLike(cardId);
        }
    }
}




