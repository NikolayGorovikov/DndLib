function toDegrees(angle){
    return angle * (180 / Math.PI);
}
function stickPosition(ball){
    ball.stick.style.width = Math.sqrt(Math.pow(ball.getBoundingClientRect().x+ball.getBoundingClientRect().width/2-ball.parent.getBoundingClientRect().right+Math.min(innerHeight, innerWidth)/200, 2)+Math.pow(ball.getBoundingClientRect().y+ball.getBoundingClientRect().height/2-ball.parent.getBoundingClientRect().y-ball.parent.getBoundingClientRect().height/2, 2))+`px`;
    let degrees = toDegrees(Math.acos(Math.abs((ball.getBoundingClientRect().x+ball.getBoundingClientRect().width/2 -ball.parent.getBoundingClientRect().right+Math.min(innerHeight, innerWidth)/200))/parseFloat(ball.stick.style.width)));
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
    elem.stick.style.transitionProperty = "width";
}
function after(elem){
    setTimeout(()=>{
        DND.end(elem);
        elem.style.transitionProperty = "";
        elem.stick.style.transitionProperty = "";
        elem.style.zIndex = "100";
    }, 500);
}
function hoverin(target){
    if (target.ans) return;
    target.style.boxShadow = "none";
}
function begin(elem){
    elem.style.zIndex = "101";
    try{elem.ans.ans = undefined;}catch (e){}
}
function doSuccess(elem, target){
    if (target.ans !== undefined) {
        notSuccess(elem);
        return;
    }
    elem.stick.style.transitionProperty = "";
    elem.style.left = "calc(100% - 3.5vmin + 8vw + 32vw * 0.1 + 1vmin)";
    elem.style.top = "calc(72vmin * 21 / 200 - 1vmin - 4vmin + ("+target.id[3]+" - "+elem.parentElement.dataset.num+") * (0.25 * 72vmin))";
    target.ans = elem;
    elem.ans = target;
    let a = setInterval(()=>stickPosition(elem), 10);
    setTimeout(()=>{
        clearInterval(a);
        if (eval(elem.parentElement.innerText) == target.innerText) {
            target.style.boxShadow = "0 0 2vmin green";
        }
        else{
            target.style.boxShadow = "0 0 2vmin red";
        }
    }, 510);
}
for (let i of document.querySelectorAll(".task > .circle")){
    i.setAttribute("data-dnd-clone", "");
    i.setAttribute("data-dnd-cloneBegin", "visibility: visible");
    i.setAttribute("data-dnd-target", "ans1 ans2 ans3 ans4");
    i.stick = i.parentElement.querySelector(".line");
    i.parent = i.parentElement;
    i.setAttribute("data-dnd-doanywaybefore", "before(dragElem)");
    i.setAttribute("data-dnd-onMove", "stickPosition(dragElem)");
    i.setAttribute("data-dnd-donotsuccess", "notSuccess(dragElem);");
    i.setAttribute("data-dnd-dosuccess", "doSuccess(dragElem, target)");
    i.setAttribute("data-dnd-doanywayafter", "after(dragElem);");
    i.setAttribute("data-dnd-ignore", ".line");
    i.setAttribute("data-dnd-dohoverin", "hoverin(target)");
    i.setAttribute("data-dnd-dohoverout", "hoverin(target)");
    i.setAttribute("data-dnd-dobegin", "begin(dragElem)");
}