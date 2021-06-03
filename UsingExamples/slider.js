let gradient="linear-gradient(90deg";
for (let i = 0;i<360; i++){
    console.log(1);
    gradient+=",hsl("+(i+1)+", 100%, 50%)";
}
gradient+=")";
console.log(gradient);
document.querySelector(".slider").style.backgroundImage = gradient;