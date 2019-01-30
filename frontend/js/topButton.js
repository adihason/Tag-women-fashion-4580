window.onscroll = function(){
    scrollFunction();
}
//the function loads the get up button
function scrollFunction(){
    if(document.documentElement.scrollTop > 20){
        document.getElementById("up-button").style.display = "block";
    }
    else{
        document.getElementById("up-button").style.display = "none";
    }
}