function toDegrees(angle){
    return angle * (180 / Math.PI);
}
DND.addHoverBehaviour(function (event, elem){
    return [elem.getBoundingClientRect().x+elem.getBoundingClientRect().width/2+1, elem.getBoundingClientRect().y+elem.getBoundingClientRect().height/2];
}, "center1");
function stickPosition(ball){
    ball.stick.style.width = Math.sqrt(Math.pow(ball.getBoundingClientRect().x+ball.getBoundingClientRect().width/2-ball.parent.getBoundingClientRect().right+Math.min(innerHeight, innerWidth)/200, 2)+Math.pow(ball.getBoundingClientRect().y+ball.getBoundingClientRect().height/2-ball.parent.getBoundingClientRect().y-ball.parent.getBoundingClientRect().height/2, 2))+`px`;
    let degrees = toDegrees(Math.acos(Math.abs((ball.getBoundingClientRect().x+ball.getBoundingClientRect().width/2 -ball.parent.getBoundingClientRect().right+Math.min(innerHeight, innerWidth)/200))/parseFloat(ball.stick.style.width)));
    console.log(((ball.getBoundingClientRect().x+ball.getBoundingClientRect().width/2 -ball.parent.getBoundingClientRect().right+Math.min(innerHeight, innerWidth)/200)));
    console.log(Math.acos(Math.abs((ball.getBoundingClientRect().x+ball.getBoundingClientRect().width/2 -ball.parent.getBoundingClientRect().right+Math.min(innerHeight, innerWidth)/200))/parseFloat(ball.stick.style.width)));
    console.log();
    if (ball.getBoundingClientRect().x+ball.getBoundingClientRect().width/2 - ball.parent.getBoundingClientRect().right+Math.min(innerHeight, innerWidth)/200 <= 0) {
        degrees = 180-degrees;
    }
    if (ball.parent.getBoundingClientRect().y+ball.parent.getBoundingClientRect().height/2 > ball.getBoundingClientRect().y+ball.getBoundingClientRect().height/2) {
        degrees = 360-degrees;
    }
    ball.stick.style.transform = `rotate(${degrees}deg)`;
    console.log(degrees);
}
function notSuccess(elem){
    elem.style.left = "calc(100% - 3.5vmin)";
    elem.style.top = "calc(72vmin * 21 / 200 - 1vmin - 4vmin)";
    elem.stick.style.width = "0";
}
function before(elem){
    elem.style.transitionProperty = "left, top";
    elem.stick.style.transitionProperty = "width, transform";
}
function after(elem){
    setTimeout(()=>{
        DND.end(elem);
        elem.style.transitionProperty = "";
        elem.stick.style.transitionProperty = "";
    }, 500);
}
function doSuccess(elem, target){
    elem.style.transitionProperty = "";
    elem.left = elem.style.left;
    elem.top = elem.style.top;
    elem.style.left = "calc(100% - 3.5vmin + 8vw + 32vw * 0.1 + 1vmin)";
    elem.style.top = "calc(72vmin * 21 / 200 - 1vmin - 4vmin)";
    stickPosition(elem);
    elem.style.left = elem.left;
    elem.style.top = elem.top;
    setTimeout(()=>{
        elem.style.transitionProperty = "left, top";
        elem.style.left = "calc(100% - 3.5vmin + 8vw + 32vw * 0.1 + 1vmin)";
        elem.style.top = "calc(72vmin * 21 / 200 - 1vmin - 4vmin)";
    }, 0);
}
for (let i of document.querySelectorAll(".task > .circle")){
    i.setAttribute("data-dnd-clone", "");
    i.setAttribute("data-dnd-cloneBegin", "visibility: visible");
    i.setAttribute("data-dnd-target", "ans1");
    i.stick = i.parentElement.querySelector(".line");
    i.parent = i.parentElement;
    i.setAttribute("data-dnd-doanywaybefore", "before(dragElem)");
    i.setAttribute("data-dnd-onMove", "stickPosition(dragElem)");
    i.setAttribute("data-dnd-donotsuccess", "notSuccess(dragElem);");
    i.setAttribute("data-dnd-hoverBehavior", "center1");
    i.setAttribute("data-dnd-dosuccess", "doSuccess(dragElem, target)");
    i.setAttribute("data-dnd-doanywayafter", "after(dragElem);");
}