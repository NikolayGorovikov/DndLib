let code = document.getElementById("code");
let screen = document.getElementById("screen");
code.innerText = '<p style="color:red;">TEXT</p>';
screen.innerHTML = code.innerText;
function makeCorrectSize(dragElem){
    dragElem.style.width = "calc(90vw * 22 / 100)";
    dragElem.style.height = "14vmin";
    dragElem._system.clone.innerText = '';
}
function doAnywayBefore(elem){
    elem.style.transform = "none";
    elem.time = 0;
}
function doSuccess(elem, target){
    let changeCode = code.innerText.split('"');
    changeCode[3] = elem.querySelector("p").innerText;
    elem.querySelector("p").style.color = "transparent";
    code.style.color = "transparent";
    setTimeout(()=>{
        elem.querySelector("p").innerText = changeCode[1];
        code.innerText = changeCode[0]+'"'+changeCode[3]+'"'+changeCode[2];
        target.querySelector("#screen").innerHTML = code.innerText;
        elem.querySelector("p").style.color= "black";
        code.style.color = "black";
    }, 500);
    elem.time+=1000;
}
function doAnywayAfter(elem){
    elem.style.transitionProperty = "left, top, transform";
    setTimeout(()=>{
        elem.style.top = elem._system.clone.offsetTop+"px";
        elem.style.left = elem._system.clone.offsetLeft+"px";
    }, elem.time)
    setTimeout(function (){
        elem.style.position = "static";
        elem.style.transitionProperty = "";
        DND.end(elem);
    }, elem.time+500);
}