import ViteImg from '@assets/images/vite.svg';
const imgEl = document.createElement("img")
imgEl.src = ViteImg;
console.log("img", document.getElementsByClassName("static-resource"));
document.getElementsByClassName("static-resource")[0].appendChild(imgEl)