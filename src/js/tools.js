export const makeElement = (str) => {
  let elemType;
  let attr = {};
  let newItem;
  let childItems = [];
  let childIdx = -1;

  str.split(" ").forEach((item, idx) => {
    if (idx === 0) {
      elemType = item.substring(1);
      newItem = document.createElement(elemType);
    } else {
      if (item.includes("=")) {
        console.log(item);
        const [attrType, attrItem] = item.split("=");

        if (childIdx === -1) attr[attrType] = attrItem;
        else childItems[childIdx].attr[attrType] = attrItem;
      }
      if (item.includes("<")) {
        childIdx += 1;
        childItems.push({ elemType: item.substring(1), attr: {} });
      }
    }
  });

  console.log("att", attr, "child", childItems);

  Object.keys(attr).forEach((_key) => {
    newItem[_key] = attr[_key];
  });

  childItems.forEach((child) => {
    let newChild = document.createElement(child.elemType);

    Object.keys(child.attr).forEach((_key) => {
      newChild[_key] = child.attr[_key];
    });

    newItem.appendChild(newChild);
  });

  return newItem;
};

export const makeParsedElement = (txt) => {
  const type = txt.trim().split(" ")[0].substring(1);
  const newDom = document.createElement(type);

  newDom.innerHTML = txt.trim();

  return newDom.firstChild;
};
