import View from "./js/view";

const container = document.createElement("div");
document.body.appendChild(container);
const time = document.createElement("button");
time.setAttribute("id", "time");
time.setAttribute("border", "1px solid black");

container.appendChild(time);

new View(container);
