let gradient;
for (let i of document.querySelectorAll(".dragger")) i.insertAdjacentHTML("afterbegin", '<div class="drin"></div>');
function randomInteger(a,b){
    return a+Number(((b-a)*Math.random()).toFixed(0));
}
innerWidth
let actualWidth = innerWidth;
let actualHeight = innerHeight;
function getAmount(e, max, main, spec){
    let actualLeft = parseFloat(e.style.left) - ((max - e.getBoundingClientRect().width) > 0?max - e.getBoundingClientRect().width:0)/2;
    if (actualLeft < 0) actualLeft = 0;
    else if (actualLeft + e.getBoundingClientRect().width > e.parentElement.getBoundingClientRect().width) actualLeft = e.parentElement.getBoundingClientRect().width - e.getBoundingClientRect().width;
    if (!main || spec){
        e.left = actualLeft/(e.parentElement.getBoundingClientRect().width-e.getBoundingClientRect().width);
        return actualLeft/(e.parentElement.getBoundingClientRect().width-e.getBoundingClientRect().width);
    }
    else return e.left;
}
document.querySelectorAll(".dragger").forEach((e)=>e.style.left = randomInteger(0, Math.floor(e.parentElement.getBoundingClientRect().width - e.getBoundingClientRect().width))+"px");
function refactor(a,b,c){
    let deg = getAmount(document.querySelector(".slider > .dragger"), Math.min(actualHeight, actualWidth)*5.95/100, a, a&&b&&c)*360;
    let satur = getAmount(document.querySelector(".sliderSaturation .dragger"), Math.min(actualHeight, actualWidth)*5.95/100, b,a&&b&&c)*100;
    let light = getAmount(document.querySelector(".sliderLightness .dragger"), Math.min(actualHeight, actualWidth)*5.95/100, c,a&&b&&c)*100;
    if (a){
        gradient="linear-gradient(90deg";
        for (let i = 0;i<360; i++){
            gradient+=",hsl("+(i+1)+", "+satur+"%, "+light+"%)";
        }
        gradient+=")";
        document.querySelector(".slider").style.backgroundImage = gradient;
    }
    if (b){
        gradient="linear-gradient(90deg";
        for (let i = 0;i<100; i+=0.5){
            gradient+=",hsl("+deg+", "+i+"%, "+light+"%)";
        }
        gradient+=")";
        document.querySelector(".sliderSaturation").style.backgroundImage = gradient;
    }
    if (c){
        gradient="linear-gradient(90deg";
        for (let i = 0;i<100; i+=0.5){
            gradient+=",hsl("+deg+", "+satur+"%, "+i+"%)";
        }
        gradient+=")";
        document.querySelector(".sliderLightness").style.backgroundImage = gradient;
    }
    document.getElementById("color").style.backgroundColor = "hsl("+deg+","+satur+"%,"+light+"%)";
    document.getElementById("colorInHSL").innerHTML = "hsl("+deg.toFixed(0)+", "+satur.toFixed(0)+"%, "+light.toFixed(0)+"%)";
    document.getElementById("colorInRGB").innerHTML = document.getElementById("color").style.backgroundColor;
    let one6=document.getElementById("color").style.backgroundColor.split("rgb").join("").split(")").join("").split("(").join("").split(",").map((e)=>e.split(" ").join(""));
    document.getElementById("colorIn16").innerHTML = "#"+Number(one6[0]).toString(16).padStart(2, "0")+Number(one6[1]).toString(16).padStart(2, "0")+Number(one6[2]).toString(16).padStart(2, "0");

}
refactor(true, true, true);
function begin(elem){
    clearInterval(elem.drop);
    let finalWidth = Math.min(actualWidth, actualHeight)*3.5*0.7/100;
    elem.interval = setInterval(function (){
        if (parseFloat(elem.style.width) > Math.min(actualWidth, actualHeight)*5.95/100) {
            clearInterval(elem.interval);
            return;
        }
        elem.style.width = parseFloat(elem.style.width) + finalWidth/15 + "px";
        if (parseFloat(elem.style.left) - finalWidth/30 > 0 && parseFloat(elem.style.left) - finalWidth/30 + parseFloat(elem.style.width) < elem.parentElement.offsetWidth) elem.style.left = parseFloat(elem.style.left) - finalWidth/30 + "px";
        else if (parseFloat(elem.style.left) - finalWidth/30 < 0) elem.style.left = "0";
        else elem.style.left = elem.parentElement.offsetWidth - parseFloat(elem.style.width) + "px";
    }, 6);
}
function move(elem){
    if (parseFloat(elem.style.left) < 0) elem.style.left = "0";
    else if (elem.offsetLeft+elem.getBoundingClientRect().width > elem.parentElement.getBoundingClientRect().width) elem.style.left = elem.parentElement.getBoundingClientRect().width - elem.getBoundingClientRect().width + "px";
    if (elem.parentElement.classList.contains("slider")) refactor(false, true, true);
    else if (elem.parentElement.classList.contains("sliderSaturation")) refactor(true, false, true);
    else refactor(true, true, false);
}
function drop(elem){
    clearInterval(elem.interval);
    let finalWidth = Math.min(actualWidth, actualHeight)*3.5*0.7/100;
    elem.drop = setInterval(function (){
        if (parseFloat(elem.style.width) < Math.min(actualWidth, actualHeight)*3.5/100) {
            clearInterval(elem.drop);
            return;
        }
        elem.style.left = parseFloat(elem.style.left) + finalWidth/30 + "px";
        elem.style.width = parseFloat(elem.style.width) - finalWidth/15 + "px";
    }, 6);
}
function resize(){
    actualHeight = document.documentElement.getBoundingClientRect().height;
    actualWidth = document.documentElement.getBoundingClientRect().width;
    document.querySelectorAll(".slider>.dragger, .sliderLightness>.dragger, .sliderSaturation>.dragger").forEach((e)=>{
        e.style.width= "3.5vmin";
        e.style.height= "14vmin";
        e.style.left = (e.parentElement.getBoundingClientRect().width - e.getBoundingClientRect().width)*e.left+(Math.min(actualWidth, actualHeight)*5.95/100-Math.min(actualWidth, actualHeight)*3.5/100)/2+"px";
    });
}
window.onresize = resize;
