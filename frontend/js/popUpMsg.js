function displayMsg(msg, msgId, removeAfter) {
    msgId.classList.remove("invisible");
    msgId.innerText = msg;
    setTimeout(function () {
        msgId.innerText = "";
        msgId.classList.add("invisible");
    }, removeAfter);
}