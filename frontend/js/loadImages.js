
    // const $targetContainer = document.querySelector("#output-images");
    // const $template = document.querySelector("#clone");

    const vars = {
        $targetContainer: document.querySelector("#output-images"),
        $template: document.querySelector("#clone"),
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
                createNewImage(jsonResBody[i], vars.$targetContainer, vars.$template);
            }
        })
        .catch(reason => console.log("Error", reason.message));
}

function createNewImage(imageArr, $targetContainer, $template){
    const $clonedContainer = $template.cloneNode(true);
    $clonedContainer.id = `image-number-${Math.random()}`;
    $clonedContainer.querySelector(".card-img-top").src = imageArr["url"];
    $clonedContainer.querySelector(".card-title").innerHTML = imageArr["description"];
    $clonedContainer.querySelector(".list-group-item").innerHTML = `price: ${imageArr["price"]}`;
    $clonedContainer.querySelector(".btn-dark").id = `cart-btn-${Math.random()}`;
    $clonedContainer.querySelector(".btn-primary").id = `like-btn-${Math.random()}`;
    $clonedContainer.classList.remove("d-none");
    $targetContainer.appendChild($clonedContainer);
}