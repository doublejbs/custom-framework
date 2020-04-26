import { h, init } from "snabbdom";
import toVNode from "snabbdom/es/tovnode";
import props from "snabbdom/es/modules/props";
import Model from "./model";

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
  }

  init() {
    document.getElementsByTagName("html")[0].style.width = "100%";
    document.getElementsByTagName("html")[0].style.height = "100%";

    document.getElementsByTagName("body")[0].style.width = "100%";
    document.getElementsByTagName("body")[0].style.height = "100%";

    document.addEventListener("click", (e) => {
      console.log("target clicked", e.target.id);
    });
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
    const { counter } = this.model;

    const html = `
    <div id="wrapper">
        <span>test</span>
    </div>`;
    this.container.innerHTML = html;
    //this.container.innerHTML = `${hours}:${minutes}:${seconds}`;
    this.requestRender = 0;
    console.log("render()");
  }
}
