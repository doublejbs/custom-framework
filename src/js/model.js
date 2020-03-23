import _ from "lodash";
const predefinedProps = ["hours", "minutes", "seconds"];

export default class Model {
  constructor(callback) {
    const proxy = new Proxy(this, {
      get(target, property) {
        return target[property];
      },
      set(target, property, value) {
        const oldValue = target[property];
        target[property] = value;
        console.log("target", target);
        // Notify model changes if value is changed.
        if (!_.isEqual(value, oldValue) && callback) {
          callback(property, oldValue, value);
        }

        return true;
      }
    });

    return proxy;
  }
}
