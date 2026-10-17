import { items } from "./items.js";

export function renderItems(list) {
  const listElement = document.querySelector("#list");

  if (!listElement) return;

  listElement.innerHTML = "";

  for (const item of list) {
    const li = document.createElement("li");
    li.className = "goods-item";
    li.textContent = `${item.name} - ${item.price} EGP`;
    listElement.appendChild(li);
  }
}

export function matching() {
  return items.filter((item) => item.category === "bags");
}

export function start() {
  renderItems(items);

  const button = document.querySelector("#pick");
  if (!button) return;

  button.addEventListener("click", () => {
    renderItems(matching());
  });
}
