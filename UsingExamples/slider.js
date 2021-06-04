let gradient;
function randomInteger(a,b){
    return a+Number(((b-a)*Math.random()).toFixed(0));
}
function getAmount(e, max){
    let actualLeft = parseFloat(e.style.left) - (max - e.getBoundingClientRect().width)/2;
    if (actualLeft < 0) actualLeft = 0;
    else if (actualLeft + e.getBoundingClientRect().width > e.parentElement.getBoundingClientRect().width) actualLeft = e.parentElement.getBoundingClientRect().width - e.getBoundingClientRect().width;
    return actualLeft/(e.parentElement.getBoundingClientRect().width-e.getBoundingClientRect().width);
}
document.querySelectorAll(".dragger").forEach((e)=>e.style.left = randomInteger(0, Math.floor(e.parentElement.getBoundingClientRect().width - e.getBoundingClientRect().width))+"px");
function refactor(a,b,c){
    let deg = getAmount(document.querySelector(".slider > .dragger"), Math.min(innerHeight, innerWidth)*5.95/100)*360;
    let satur = getAmount(document.querySelector(".sliderSaturation .dragger"), Math.min(innerHeight, innerWidth)*5.95/100)*100;
    let light = getAmount(document.querySelector(".sliderLightness .dragger"), Math.min(innerHeight, innerWidth)*5.95/100)*100;
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
}
refactor(true, true, true);
function begin(elem){
    clearInterval(elem.drop);
    let finalWidth = Math.min(innerWidth, innerHeight)*3.5*0.7/100;
    elem.interval = setInterval(function (){
        elem.style.width = parseFloat(elem.style.width) + finalWidth/30 + "px";
        if (parseFloat(elem.style.left) - finalWidth/60 > 0 && parseFloat(elem.style.left) - finalWidth/60 + elem.getBoundingClientRect().width < elem.parentElement.getBoundingClientRect().width) elem.style.left = parseFloat(elem.style.left) - finalWidth/60 + "px";
        else if (parseFloat(elem.style.left) - finalWidth/60 < 0) elem.style.left = "0";
        else elem.style.left = elem.parentElement.getBoundingClientRect().width - parseFloat(elem.style.width) + "px";
        if (elem.getBoundingClientRect().width > Math.min(innerWidth, innerHeight)*5.95/100) {
            clearInterval(elem.interval);
        }
    }, 200/30);
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
    let finalWidth = Math.min(innerWidth, innerHeight)*3.5*0.7/100;
    elem.drop = setInterval(function (){
        elem.style.left = parseFloat(elem.style.left) + finalWidth/60 + "px";
        elem.style.width = elem.getBoundingClientRect().width - finalWidth/30 + "px";
        if (elem.getBoundingClientRect().width < Math.min(innerWidth, innerHeight)*3.5/100) {
            clearInterval(elem.drop);
        }
    }, 200/30);
}