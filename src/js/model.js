import _ from "lodash";

export default class Model {
  constructor(callback) {
    const proxy = new Proxy(this, {
      get(target, property) {
        return target[property];
      },
      set(target, property, value) {
        const oldValue = target[property];

        if (Array.isArray(value)) {
          if (!target["containers"])
            target["containers"] = { [property]: value };
          else target["containers"][property] = value;
        } else target[property] = value;

        if (!_.isEqual(value, oldValue) && callback) {
          callback(property, oldValue, value);
        }

        return true;
      },
    });

    return proxy;
  }
}
