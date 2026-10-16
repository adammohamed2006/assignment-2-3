export function readForm() {
  const name = document.querySelector("#name").value.trim();
  const price = Number(document.querySelector("#price").value);

  return { name, price };
}

export function clearForm() {
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
}

export function renderList(items) {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  for (const item of items) {
    const card = document.createElement("li");
    card.classList.add("card");

    const heading = document.createElement("h3");
    heading.textContent = item.name;

    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = `${item.price} EGP`;

    card.append(heading, price);
    list.append(card);
  }
}

export function wireForm() {
  const items = [];
  const form = document.querySelector("#product-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const item = readForm();
    const error = document.querySelector("#error");

    if (!item.name) {
      error.textContent = "Give the product a name.";
      return;
    }

    if (!(item.price > 0)) {
      error.textContent = "Give the product a price.";
      return;
    }

    error.textContent = "";
    items.push(item);
    renderList(items);
    clearForm();
  });
}
