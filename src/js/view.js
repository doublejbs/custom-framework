import { h, init } from "snabbdom";
import toVNode from "snabbdom/es/tovnode";
import props from "snabbdom/es/modules/props";
import Model from "./model";
import { makeElement } from "./tools";
import { makeParsedElement } from "./tools";

let itemStr = `<div id="item1" style=display:flex;flex-direction:row;padding:15px;justify-content:space-between; > <input type=text value=newTodo > <button id=remove innerText=- >`;
let itemParse = `
  <div id="item" style="display:flex;flex-direction:row;padding:15px;justify-content:space-between;">
    <input type="text" value="new todo"></input>
    <button id="remove">-</button>
  </div>`;
const patch = init([props]);

export default class View {
  constructor(container) {
    this.container = container;
    this.model = new Model(this.onChanges.bind(this));

    this.renderFunc = this.render.bind(this);
    this.requestRender = 0;
    this.counter = 0;
    this.init();
    this.render();
    this.items = [];
  }

  // add(items, model) {
  //   return this.handleAdd(e, items, model);
  // }

  add(items, model) {
    return function (e) {
      console.log("target clicked", e.target.id);
      if (e.target.id === "add") {
        const newItem = makeParsedElement(itemParse);
        console.log("add new item", newItem);
        console.log("type", typeof model["contents"]);
        console.log("this", model);
        // document.getElementById("contents").appendChild(newItem);
        newItem.setAttribute("order", items.length);
        items.push(newItem);
        model.contents = [...items];
      }

      if (e.target.id === "remove") {
        console.log("order", e.target.parentNode.getAttribute("order"));
        const deleteItem = e.target.parentNode;
        items = items.filter(
          (item) =>
            item.getAttribute("order") !== deleteItem.getAttribute("order")
        );
        model.contents = [...items];
        // document.getElementById("contents").removeChild(deleteItem);
      }
    };
  }

  init() {
    console.log("make", makeParsedElement(itemParse));
    document.getElementsByTagName("html")[0].style.width = "100%";
    document.getElementsByTagName("html")[0].style.height = "100%";

    document.getElementsByTagName("body")[0].style.width = "100%";
    document.getElementsByTagName("body")[0].style.height = "100%";

    this.items = [];
    this.items.push(makeParsedElement(itemParse));
    this.model.contents = this.items;
    // this.model.test = [];

    document.addEventListener("click", this.add(this.items, this.model));
  }

  handleClick() {
    console.log("clicked", this);
    if (this.model.counter === undefined) this.model.counter = 0;
    else this.model.counter += 1;
  }

  onChanges(property, oldValue, newValue) {
    if (this.requestRender) {
      cancelAnimationFrame(this.requestRender);
    }

    this.requestRender = requestAnimationFrame(this.renderFunc);
  }

  render() {
    console.log("render!");
    const { containers } = this.model;
    const { indexes } = this.model;

    console.log("containers", indexes);

    const html = `
    <div id="wrapper" style="width: 100%;
    background: #f3f1ea;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;">
        <div id="todoContainer" style="
        width: 30%;
        height: 60%;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
background: #f3f1ea;
box-shadow: inset 5px 5px 10px #d1cfc9, 
            inset -5px -5px 10px #ffffff;">
          <div id="todoTitle" style="
          text-align: center;
          height: 10%;
          display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    justify-content: space-between;">
      <div>ToDo</div>
      <button id="add">+</button>
    </div>
        </div>
    </div>`;
    this.container.innerHTML = html;
    for (let key in containers) {
      if (document.getElementById(key) === null) {
        const newCon = document.createElement("div");
        newCon.id = key;

        document.getElementById("todoContainer").appendChild(newCon);
      }
      console.log("in", containers[key]);
      containers[key].forEach((elem) => {
        document.getElementById(key).appendChild(elem);
      });
    }

    //this.container.innerHTML = `${hours}:${minutes}:${seconds}`;
    this.requestRender = 0;
    console.log("render()");
  }
}
